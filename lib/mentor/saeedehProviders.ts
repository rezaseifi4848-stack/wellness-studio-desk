import { canUseExternalResearch, type ResearchMode, type SensitivityLevel } from "@/lib/mentor/saeedehSafety";

type ProviderName = "tavily" | "gemini" | "groq" | "openai";

export type ProviderStatus = {
  tavily: { configured: boolean };
  gemini: { configured: boolean };
  groq: { configured: boolean };
  openai: { configured: boolean };
  liveResearchAvailable: boolean;
  imageGenerationAvailable: false;
};

export type ProviderTestResult = {
  provider: ProviderName;
  configured: boolean;
  ok: boolean;
  message: string;
  sample?: string;
};

export function getSaeedehProviderStatus(): ProviderStatus {
  const tavily = Boolean(process.env.TAVILY_API_KEY);
  const gemini = Boolean(process.env.GEMINI_API_KEY);
  const groq = Boolean(process.env.GROQ_API_KEY);
  const openai = Boolean(process.env.OPENAI_API_KEY);

  return {
    tavily: { configured: tavily },
    gemini: { configured: gemini },
    groq: { configured: groq },
    openai: { configured: openai },
    liveResearchAvailable: tavily || gemini || groq || openai,
    imageGenerationAvailable: false,
  };
}

function sanitizeProviderError(error: unknown) {
  const raw = error instanceof Error ? error.message : "Provider test failed";
  return raw
    .replace(/Bearer\s+[A-Za-z0-9._-]+/g, "Bearer [hidden]")
    .replace(/key=[A-Za-z0-9._-]+/g, "key=[hidden]")
    .replace(/api[_-]?key["':=\s]+[A-Za-z0-9._-]+/gi, "api_key [hidden]")
    .slice(0, 220);
}

async function safeJsonFetch(url: string, init?: RequestInit) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch(url, { ...init, signal: controller.signal });
    const text = await response.text();
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${text.slice(0, 120)}`);
    return text;
  } finally {
    clearTimeout(timer);
  }
}

export async function testProvider(provider: ProviderName): Promise<ProviderTestResult> {
  try {
    if (provider === "tavily") {
      if (!process.env.TAVILY_API_KEY) return { provider, configured: false, ok: false, message: "Tavily تنظیم نشده است." };
      const text = await safeJsonFetch("https://api.tavily.com/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          api_key: process.env.TAVILY_API_KEY,
          query: "meditation reels gentle wellness trend",
          max_results: 1,
        }),
      });
      return { provider, configured: true, ok: true, message: "Tavily پاسخ امن داد.", sample: text.slice(0, 260) };
    }

    if (provider === "gemini") {
      if (!process.env.GEMINI_API_KEY) return { provider, configured: false, ok: false, message: "Gemini تنظیم نشده است." };
      const text = await safeJsonFetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ parts: [{ text: "Give one safe wellness content trend in 8 words." }] }] }),
        },
      );
      return { provider, configured: true, ok: true, message: "Gemini پاسخ امن داد.", sample: text.slice(0, 260) };
    }

    if (provider === "groq") {
      if (!process.env.GROQ_API_KEY) return { provider, configured: false, ok: false, message: "Groq تنظیم نشده است." };
      const text = await safeJsonFetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [{ role: "user", content: "Give one safe wellness content trend in 8 words." }],
          max_tokens: 40,
        }),
      });
      return { provider, configured: true, ok: true, message: "Groq پاسخ امن داد.", sample: text.slice(0, 260) };
    }

    if (!process.env.OPENAI_API_KEY) return { provider, configured: false, ok: false, message: "OpenAI تنظیم نشده است." };
    const text = await safeJsonFetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
        messages: [{ role: "user", content: "Give one safe wellness content trend in 8 words." }],
        max_tokens: 40,
      }),
    });
    return { provider, configured: true, ok: true, message: "OpenAI پاسخ امن داد.", sample: text.slice(0, 260) };
  } catch (error) {
    return {
      provider,
      configured: getSaeedehProviderStatus()[provider].configured,
      ok: false,
      message: sanitizeProviderError(error),
    };
  }
}

export async function collectMentorResearch(input: {
  researchMode: ResearchMode;
  sensitivity: SensitivityLevel;
  allowExternalForSensitive?: boolean;
  manualSource?: string;
  topic?: string;
}) {
  const status = getSaeedehProviderStatus();
  const summaries: string[] = [];
  const sources: string[] = [];
  let providerUsed = "Internal mentor logic";

  if (input.manualSource?.trim()) {
    summaries.push(`منبع دستی سعیده: ${input.manualSource.trim().slice(0, 900)}`);
    sources.push("Manual source");
    providerUsed = "Manual source";
  }

  const externalAllowed = canUseExternalResearch(input.researchMode, input.sensitivity, input.allowExternalForSensitive);
  if (!externalAllowed) {
    return {
      providerUsed,
      summaries,
      sources,
      available: false,
      limitations:
        input.sensitivity === "حساس"
          ? "به‌خاطر حساس بودن موضوع، بدون تأیید صریح از provider رایگان استفاده نشد."
          : "تحقیق زنده ترند فعال نیست؛ خروجی بر اساس حافظه برند، دانش داخلی و اطلاعات واردشده تولید می‌شود.",
    };
  }

  if ((input.researchMode === "FREE_FIRST" || input.researchMode === "HYBRID") && status.tavily.configured) {
    const test = await testProvider("tavily");
    if (test.ok && test.sample) {
      summaries.push(`Tavily trend signal: ${test.sample}`);
      sources.push("Tavily");
      providerUsed = "Tavily";
    }
  }

  if ((input.researchMode === "FREE_FIRST" || input.researchMode === "HYBRID") && summaries.length < 2 && status.gemini.configured) {
    const test = await testProvider("gemini");
    if (test.ok && test.sample) {
      summaries.push(`Gemini signal: ${test.sample}`);
      sources.push("Gemini");
      providerUsed = providerUsed === "Internal mentor logic" ? "Gemini" : `${providerUsed} + Gemini`;
    }
  }

  if (input.researchMode === "PREMIUM" && status.openai.configured) {
    const test = await testProvider("openai");
    if (test.ok && test.sample) {
      summaries.push(`OpenAI premium signal: ${test.sample}`);
      sources.push("OpenAI");
      providerUsed = "OpenAI";
    }
  }

  return {
    providerUsed,
    summaries,
    sources,
    available: summaries.length > 0,
    limitations: summaries.length
      ? "سیگنال‌ها فقط برای الهام و زاویه‌سازی استفاده شدند؛ هیچ متن رقبا کپی نشده است."
      : "تحقیق زنده ترند فعال نیست؛ خروجی بر اساس حافظه برند، دانش داخلی و اطلاعات واردشده تولید می‌شود.",
  };
}
