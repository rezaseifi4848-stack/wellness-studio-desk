export type SearchStatus = {
  active: boolean;
  providers: {
    tavily: boolean;
    brave: boolean;
    serpapi: boolean;
  };
  signals: string[];
  message: string;
};

const queries = [
  "meditation content trends",
  "yoga creator Instagram ideas",
  "guided meditation scripts",
  "affirmation posts",
  "breathwork content",
  "wellness creator content",
  "Telegram channel engagement wellness",
  "Persian wellness content ideas",
];

async function safeFetch(url: string, init?: RequestInit) {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 7000);
    const response = await fetch(url, { ...init, signal: controller.signal });
    clearTimeout(timer);
    if (!response.ok) return "";
    return JSON.stringify(await response.json()).slice(0, 1200);
  } catch {
    return "";
  }
}

export async function getLiveSearchSignals(topic?: string): Promise<SearchStatus> {
  const tavily = Boolean(process.env.TAVILY_API_KEY);
  const brave = Boolean(process.env.BRAVE_SEARCH_API_KEY);
  const serpapi = Boolean(process.env.SERPAPI_KEY);
  const active = tavily || brave || serpapi;
  const q = encodeURIComponent(topic || queries.join(" OR "));
  const signals: string[] = [];

  if (tavily) {
    const body = await safeFetch("https://api.tavily.com/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ api_key: process.env.TAVILY_API_KEY, query: decodeURIComponent(q), max_results: 5 }),
    });
    if (body) signals.push(`Tavily: ${body}`);
  }

  if (brave) {
    const body = await safeFetch(`https://api.search.brave.com/res/v1/web/search?q=${q}&count=5`, {
      headers: { Accept: "application/json", "X-Subscription-Token": process.env.BRAVE_SEARCH_API_KEY || "" },
    });
    if (body) signals.push(`Brave: ${body}`);
  }

  if (serpapi) {
    const body = await safeFetch(`https://serpapi.com/search.json?q=${q}&api_key=${process.env.SERPAPI_KEY}`);
    if (body) signals.push(`SerpAPI: ${body}`);
  }

  return {
    active,
    providers: { tavily, brave, serpapi },
    signals,
    message: active
      ? "جستجوی زنده فعال است"
      : "جستجوی زنده فعال نیست؛ خروجی بر اساس موتور داخلی و قوانین برند ساخته شد.",
  };
}
