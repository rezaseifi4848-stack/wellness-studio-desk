"use client";

import { useEffect, useMemo, useState } from "react";
import { SectionCard } from "@/components/ui/SectionCard";

type ProviderStatus = {
  tavily: { configured: boolean };
  gemini: { configured: boolean };
  groq: { configured: boolean };
  openai: { configured: boolean };
  liveResearchAvailable: boolean;
  imageGenerationAvailable: false;
};

type MentorResult = {
  liveStatus?: {
    brandMemoryStatus?: string;
    researchMode?: string;
    providerUsedInLastAnswer?: string;
    confidenceLabel?: string;
    safetyGuardActive?: boolean;
  };
  diagnosis?: {
    need?: string;
    importantQuestions?: string[];
    warnings?: string[];
  };
  output?: {
    mainOutput?: Record<string, unknown>;
    shortVersion?: string;
    fullVersion?: Record<string, unknown>;
    coverPosterIdea?: Record<string, unknown>;
    safetyNote?: string;
    cta?: string;
    nextAction?: string;
    researchStatusAndLimits?: {
      mode?: string;
      providerUsed?: string;
      sources?: string[];
      summary?: string[];
      limitations?: string;
    };
  };
};

const tasks = [
  "ریلز امشب",
  "کپشن",
  "مدیتیشن خواب",
  "مدیتیشن چاکرا",
  "برنامه کلاس یوگا",
  "کاور و پوستر",
  "استوری",
  "کانال بله",
  "چالش ۷ روزه",
  "تقویم محتوای ۳۰ روزه",
  "معرفی دوره",
  "پاسخ به هنرجو",
  "فروش نرم کلاس",
  "تمرین بیان جلوی دوربین",
  "تحقیق ترند محتوا",
];

const platforms = ["Instagram", "Reel", "Story", "Bale", "Website", "Course", "Voice meditation", "Class script"];
const goals = ["جذب مخاطب", "اعتمادسازی", "آموزش", "آرام‌سازی", "فروش نرم", "معرفی کلاس", "شروع پیج", "رشد برند شخصی"];
const audiences = ["مبتدی‌ها", "خانم‌ها", "مادرها", "افراد پراسترس", "هنرجوی خصوصی", "مخاطب پیج اینستاگرام", "اعضای کانال بله"];
const researchModes = ["OFFLINE", "MANUAL_SOURCE", "FREE_FIRST", "HYBRID", "PREMIUM"];
const sensitivities = ["عمومی", "نیمه‌حساس", "حساس"];

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-[#4d4f42]">
      {label}
      <select
        className="rounded-[1.25rem] border border-[var(--line)] bg-[var(--warm-white)] px-4 py-3 text-sm font-medium text-[#4d4f42] outline-none"
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextField({
  label,
  value,
  onChange,
  placeholder,
  multiline,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
}) {
  if (multiline) {
    return (
      <label className="grid gap-2 text-sm font-semibold text-[#4d4f42]">
        {label}
        <textarea
          className="min-h-28 rounded-[1.25rem] border border-[var(--line)] bg-[var(--warm-white)] px-4 py-3 text-sm leading-8 text-[#4d4f42] outline-none"
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          value={value}
        />
      </label>
    );
  }

  return (
    <label className="grid gap-2 text-sm font-semibold text-[#4d4f42]">
      {label}
      <input
        className="rounded-[1.25rem] border border-[var(--line)] bg-[var(--warm-white)] px-4 py-3 text-sm text-[#4d4f42] outline-none"
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        value={value}
      />
    </label>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1300);
  }

  return (
    <button className="studio-button bg-[#6d755f] px-5 py-3 text-sm font-semibold text-white" onClick={copy} type="button">
      {copied ? "کپی شد" : "کپی خروجی کامل"}
    </button>
  );
}


function ReadableValue({ value }: { value: unknown }) {
  if (Array.isArray(value)) {
    return (
      <ul className="grid gap-2 text-sm leading-8 text-[var(--ink-soft)]">
        {value.map((item, index) => (
          <li className="rounded-2xl bg-white/65 px-4 py-2" key={index}>{typeof item === "object" ? JSON.stringify(item, null, 2) : String(item)}</li>
        ))}
      </ul>
    );
  }

  if (value && typeof value === "object") {
    return <ReadableOutput output={value as Record<string, unknown>} compact />;
  }

  return <p className="whitespace-pre-line text-sm leading-8 text-[var(--ink-soft)]">{String(value || "-")}</p>;
}

function ReadableOutput({ output, compact = false }: { output?: Record<string, unknown>; compact?: boolean }) {
  if (!output) return null;
  return (
    <div className={`grid gap-4 ${compact ? "" : "md:grid-cols-2"}`}>
      {Object.entries(output).map(([key, value]) => (
        <article className="rounded-[1.5rem] bg-white/75 p-5 shadow-[0_16px_45px_rgba(97,91,70,0.06)]" key={key}>
          <h4 className="mb-3 text-lg font-semibold text-[#4d4f42]">{key}</h4>
          <ReadableValue value={value} />
        </article>
      ))}
    </div>
  );
}
function StatusPill({ label, active }: { label: string; active?: boolean }) {
  return (
    <span className={`rounded-full px-4 py-2 text-xs font-semibold ${active ? "bg-[rgba(168,184,160,0.32)] text-[#4d5a44]" : "bg-white/70 text-[#8a7a55]"}`}>
      {label}: {active ? "فعال" : "غیرفعال"}
    </span>
  );
}

export function SaeedehMasterMentor() {
  const [providerStatus, setProviderStatus] = useState<ProviderStatus | null>(null);
  const [providerTest, setProviderTest] = useState<string>("");
  const [task, setTask] = useState("ریلز امشب");
  const [platform, setPlatform] = useState("Reel");
  const [goal, setGoal] = useState("آرام‌سازی");
  const [audience, setAudience] = useState("مخاطب پیج اینستاگرام");
  const [topic, setTopic] = useState("برای امشب یک ریلز مدیتیشن خواب می‌خوام؛ با کپشن، کاور، متن گفتاری، استوری و CTA.");
  const [mood, setMood] = useState("نرم، زنانه، صمیمی، قبل خواب");
  const [duration, setDuration] = useState("۶۰ ثانیه");
  const [manualSource, setManualSource] = useState("");
  const [cta, setCta] = useState("ذخیره کن برای قبل خواب و برای یک دوست بفرست.");
  const [safetyLimit, setSafetyLimit] = useState("");
  const [researchMode, setResearchMode] = useState("PREMIUM");
  const [providerMode, setProviderMode] = useState("auto-live");
  const [sensitivity, setSensitivity] = useState("عمومی");
  const [allowExternalForSensitive, setAllowExternalForSensitive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MentorResult | null>(null);

  useEffect(() => {
    fetch("/api/mentor/saeedeh/provider-status")
      .then((response) => response.json())
      .then(setProviderStatus)
      .catch(() => setProviderStatus(null));
  }, []);

  const outputText = useMemo(() => JSON.stringify(result || {}, null, 2), [result]);

  async function generate() {
    setLoading(true);
    const response = await fetch("/api/mentor/saeedeh/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        task,
        platform,
        goal,
        audience,
        topic,
        mood,
        duration,
        manualSource,
        cta,
        safetyLimit,
        researchMode,
        providerMode,
        sensitivity,
        allowExternalForSensitive,
      }),
    });
    setResult(await response.json());
    setLoading(false);
  }

  async function runProviderTest(provider: string) {
    setProviderTest(`در حال تست ${provider}...`);
    const response = await fetch("/api/mentor/saeedeh/provider-test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ provider }),
    });
    const json = await response.json();
    setProviderTest(`${json.provider}: ${json.ok ? "موفق" : "ناموفق"} - ${json.message}`);
  }

  return (
    <div className="grid gap-8">
      <SectionCard
        title="Live Status Panel"
        description="وضعیت حافظه برند، Research Mode، providerها و گارد ایمنی بدون نمایش هیچ کلیدی."
        tone="sage"
      >
        <div className="grid gap-4">
          <div className="flex flex-wrap gap-3">
            <StatusPill label="Brand memory" active />
            <StatusPill label="Tavily" active={providerStatus?.tavily.configured} />
            <StatusPill label="Gemini" active={providerStatus?.gemini.configured} />
            <StatusPill label="Groq" active={providerStatus?.groq.configured} />
            <StatusPill label="OpenAI" active={providerStatus?.openai.configured} />
            <StatusPill label="Live research" active={providerStatus?.liveResearchAvailable} />
            <StatusPill label="Image generation" active={providerStatus?.imageGenerationAvailable} />
            <StatusPill label="Safety guard" active />
          </div>
          <div className="grid gap-3 rounded-[1.5rem] bg-white/70 p-4 text-sm leading-8 text-[var(--ink-soft)] md:grid-cols-3">
            <p><b>Research Mode:</b> {researchMode}</p>
            <p><b>Provider آخرین پاسخ:</b> {result?.liveStatus?.providerUsedInLastAnswer || "هنوز پاسخی ساخته نشده"}</p>
            <p><b>Confidence:</b> {result?.liveStatus?.confidenceLabel || "-"}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {["tavily", "gemini", "groq", "openai"].map((provider) => (
              <button
                className="studio-button bg-[var(--warm-white)] px-4 py-2 text-xs font-semibold text-[#4d4f42]"
                key={provider}
                onClick={() => runProviderTest(provider)}
                type="button"
              >
                تست {provider}
              </button>
            ))}
          </div>
          {providerTest ? <p className="rounded-[1.5rem] bg-[rgba(215,192,154,0.22)] p-4 text-sm leading-8 text-[#6d6149]">{providerTest}</p> : null}
        </div>
      </SectionCard>

      <SectionCard
        title="استاد زنده سعیده"
        description="موضوع را بده، حالت تحقیق را انتخاب کن و خروجی آماده ضبط، انتشار یا تدریس بگیر."
        tone="cream"
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <SelectField label="Task Selector" onChange={setTask} options={tasks} value={task} />
          <SelectField label="Platform Selector" onChange={setPlatform} options={platforms} value={platform} />
          <SelectField label="Goal Selector" onChange={setGoal} options={goals} value={goal} />
          <SelectField label="Audience Selector" onChange={setAudience} options={audiences} value={audience} />
          <SelectField label="Research Mode" onChange={setResearchMode} options={researchModes} value={researchMode} />
          <SelectField label="Sensitivity" onChange={setSensitivity} options={sensitivities} value={sensitivity} />
          <TextField label="موضوع" onChange={setTopic} value={topic} />
          <TextField label="حال و هوای محتوا" onChange={setMood} value={mood} />
          <TextField label="مدت ویدیو یا مدیتیشن" onChange={setDuration} value={duration} />
          <TextField label="CTA موردنظر" onChange={setCta} value={cta} />
          <SelectField label="Provider Mode" onChange={setProviderMode} options={["auto-live", "openai", "auto", "local"]} value={providerMode} />
          <TextField label="محدودیت یا نکته ایمنی" onChange={setSafetyLimit} placeholder="مثلاً مبتدی، درد زانو، بارداری..." value={safetyLimit} />
        </div>
        <TextField
          label="متن/منبع دستی"
          multiline
          onChange={setManualSource}
          placeholder="لینک، نکته، متن خام، ایده یا منبعی که سعیده می‌خواد تحلیل بشه..."
          value={manualSource}
        />
        {sensitivity === "حساس" ? (
          <label className="flex items-center gap-3 rounded-[1.5rem] bg-[rgba(215,192,154,0.22)] p-4 text-sm font-semibold text-[#6d6149]">
            <input
              checked={allowExternalForSensitive}
              onChange={(event) => setAllowExternalForSensitive(event.target.checked)}
              type="checkbox"
            />
            برای موضوع حساس، استفاده از provider خارجی را خودم تأیید می‌کنم.
          </label>
        ) : null}
        <button className="studio-button bg-[#6d755f] px-7 py-4 text-base font-semibold text-white" disabled={loading} onClick={generate} type="button">
          {loading ? "استاد سعیده در حال فکر کردن..." : "ساخت خروجی با استاد زنده"}
        </button>
      </SectionCard>

      <SectionCard
        title="Output Panel"
        description="هر پاسخ شامل تشخیص نیاز، سوال‌های مهم، خروجی اصلی، نسخه کوتاه/کامل، CTA، اقدام بعدی و وضعیت تحقیق است."
        tone="lavender"
      >
        {result ? (
          <div className="grid gap-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[1.5rem] bg-white/75 p-5 text-sm leading-8 text-[#4d4f42]">
                <h3 className="text-lg font-semibold">تشخیص نیاز</h3>
                <p className="mt-3">{result.diagnosis?.need}</p>
              </div>
              <div className="rounded-[1.5rem] bg-white/75 p-5 text-sm leading-8 text-[#4d4f42]">
                <h3 className="text-lg font-semibold">سؤال‌ها و هشدارها</h3>
                <p className="mt-3">{result.diagnosis?.importantQuestions?.join(" | ")}</p>
                <p className="mt-2 text-[#7a6d51]">{result.diagnosis?.warnings?.join(" | ")}</p>
              </div>
            </div>
            <div className="rounded-[1.5rem] bg-white/75 p-5 text-sm leading-8 text-[#4d4f42]">
              <h3 className="text-lg font-semibold">نسخه کوتاه</h3>
              <p className="mt-3">{result.output?.shortVersion}</p>
            </div>
            <div className="rounded-[1.5rem] bg-white/75 p-5 text-sm leading-8 text-[#4d4f42]">
              <h3 className="text-lg font-semibold">CTA و اقدام بعدی</h3>
              <p className="mt-3"><b>CTA:</b> {result.output?.cta}</p>
              <p className="mt-2"><b>اقدام بعدی:</b> {result.output?.nextAction}</p>
              <p className="mt-2"><b>نکته ایمنی:</b> {result.output?.safetyNote}</p>
            </div>`r`n            <ReadableOutput output={result.output?.mainOutput} />
            <ReadableOutput output={result.output?.mainOutput} />`r`n            <div className="flex flex-wrap items-center gap-3">
              <CopyButton text={outputText} />
              <span className="text-sm leading-8 text-[var(--ink-soft)]">
                وضعیت تحقیق: {result.output?.researchStatusAndLimits?.limitations}
              </span>
            </div>
            <details className="rounded-[1.5rem] bg-[#2f332b] p-5 text-[#f8f6f1]">`r`n              <summary className="cursor-pointer text-sm font-semibold">نمایش JSON کامل</summary>`r`n              <pre className="mt-4 max-h-[520px] overflow-auto text-left text-xs leading-6 [direction:ltr]">{outputText}</pre>`r`n            </details>
          </div>
        ) : (
          <p className="rounded-[1.5rem] bg-white/75 p-5 text-sm leading-8 text-[var(--ink-soft)]">
            هنوز خروجی ساخته نشده. یک task انتخاب کن و روی «ساخت خروجی با استاد زنده» بزن.
          </p>
        )}
      </SectionCard>
    </div>
  );
}



