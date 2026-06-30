"use client";

import { useMemo, useState } from "react";
import { EngineStatusPanel } from "@/components/EngineStatusPanel";
import { saeedehBrainConfig, type SaeedehBrainMode } from "@/src/data/saeedehBrainConfig";

type AiBrainSettingsClientProps = {
  initialStatus: {
    openAiKeyActive: boolean;
    openAiModel: string;
    liveAiEnabled: boolean;
    liveSearchEnabled: boolean;
    outputMode: string;
    lastGenerated?: string;
    source: string;
    warnings: string[];
    aiActive: boolean;
    searchActive: boolean;
  };
};

type BrainResult = {
  engineStatus?: AiBrainSettingsClientProps["initialStatus"] & {
    lastTestGenerationTime?: string;
  };
  status?: AiBrainSettingsClientProps["initialStatus"];
  qualityScore?: { total?: number; action?: string };
  safety?: { status?: string; disclaimer?: string };
  outputs?: Record<string, unknown>;
  improveActions?: string[];
};

const modeKeys = Object.keys(saeedehBrainConfig.brainModes) as SaeedehBrainMode[];

function CopyBrainButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <button className="studio-button bg-[#6d755f] px-5 py-3 text-sm font-semibold text-white" onClick={copy} type="button">
      {copied ? "کپی شد" : "کپی خروجی تست"}
    </button>
  );
}

export function AiBrainSettingsClient({ initialStatus }: AiBrainSettingsClientProps) {
  const [topic, setTopic] = useState("مدیتیشن قبل خواب برای کانال بله");
  const [brainMode, setBrainMode] = useState<SaeedehBrainMode>("meditation");
  const [result, setResult] = useState<BrainResult | null>(null);
  const [loading, setLoading] = useState(false);

  const outputText = useMemo(() => JSON.stringify(result?.outputs || {}, null, 2), [result]);
  const activeStatus = result?.engineStatus || result?.status || initialStatus;

  async function testBrain() {
    setLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        module: "ai-brain-settings",
        outputType: "brain-test",
        platform: "Bale",
        channel: saeedehBrainConfig.channel,
        topic,
        contentGoal: "تست مغز سعیده برای خروجی publish-ready",
        level: "elite",
        freshness: "today",
        meditationFocus: "مدیتیشن، مکث، بدن‌آگاهی و لحن قابل خواندن",
        brainMode,
        strictPublishReady: true,
      }),
    });
    setResult(await response.json());
    setLoading(false);
  }

  return (
    <div className="grid gap-8">
      <EngineStatusPanel status={activeStatus} />

      <section className="soft-panel cream-to-white grid gap-5 p-6">
        <div>
          <p className="text-sm font-semibold text-[#7a6d51]">Brand Brain Configuration</p>
          <h2 className="mt-2 text-3xl font-semibold leading-12 text-[#4d4f42]">رفتار پایه مغز سعیده</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-[1.75rem] bg-white/70 p-5">
            <h3 className="font-semibold text-[#4d4f42]">لحن برند</h3>
            <p className="mt-3 text-sm leading-8 text-[var(--ink-soft)]">{saeedehBrainConfig.brandVoice.join("، ")}</p>
          </div>
          <div className="rounded-[1.75rem] bg-white/70 p-5">
            <h3 className="font-semibold text-[#4d4f42]">تمرکزها</h3>
            <p className="mt-3 text-sm leading-8 text-[var(--ink-soft)]">{saeedehBrainConfig.mainFocus.join("، ")}</p>
          </div>
          <div className="rounded-[1.75rem] bg-white/70 p-5">
            <h3 className="font-semibold text-[#4d4f42]">مخاطب</h3>
            <p className="mt-3 text-sm leading-8 text-[var(--ink-soft)]">{saeedehBrainConfig.audience.join("، ")}</p>
          </div>
        </div>
      </section>

      <section className="soft-panel lavender-to-white grid gap-5 p-6">
        <div>
          <p className="text-sm font-semibold text-[#736883]">One-click brain modes</p>
          <h2 className="mt-2 text-3xl font-semibold leading-12 text-[#4d4f42]">حالت مغز را انتخاب کن</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {modeKeys.map((key) => {
            const mode = saeedehBrainConfig.brainModes[key];
            const active = brainMode === key;
            return (
              <button
                className={`studio-button px-5 py-3 text-sm font-semibold ${
                  active ? "bg-[#6d755f] text-white" : "bg-white/75 text-[#5f5b4d]"
                }`}
                key={key}
                onClick={() => setBrainMode(key)}
                type="button"
              >
                {mode.label}
              </button>
            );
          })}
        </div>
        <p className="rounded-[1.5rem] bg-white/70 p-4 text-sm leading-8 text-[var(--ink-soft)]">
          {saeedehBrainConfig.brainModes[brainMode].instruction}
        </p>
      </section>

      <section className="soft-panel sage-to-cream grid gap-5 p-6">
        <div>
          <p className="text-sm font-semibold text-[#657158]">Test generation panel</p>
          <h2 className="mt-2 text-3xl font-semibold leading-12 text-[#4d4f42]">تست مغز سعیده</h2>
        </div>
        <textarea
          className="min-h-28 rounded-[1.5rem] border border-[var(--line)] bg-[var(--warm-white)] p-4 text-sm leading-8 text-[#4d4f42] outline-none"
          onChange={(event) => setTopic(event.target.value)}
          value={topic}
        />
        <div className="flex flex-wrap items-center gap-3">
          <button className="studio-button bg-[#6d755f] px-6 py-3 text-sm font-semibold text-white" disabled={loading} onClick={testBrain} type="button">
            {loading ? "مغز سعیده در حال ساختن..." : "تست مغز سعیده"}
          </button>
          {result ? <CopyBrainButton text={outputText} /> : null}
        </div>
      </section>

      <section className="soft-panel grid gap-5 p-6">
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-[1.5rem] bg-[rgba(168,184,160,0.18)] p-4 text-sm leading-8 text-[#4d4f42]">
            <b>امتیاز کیفیت:</b> {result?.qualityScore?.total ?? "-"} / 10
          </div>
          <div className="rounded-[1.5rem] bg-[rgba(216,208,232,0.22)] p-4 text-sm leading-8 text-[#4d4f42]">
            <b>وضعیت ایمنی:</b> {result?.safety?.status === "safe" ? "امن" : result ? "نیازمند بررسی" : "-"}
          </div>
          <div className="rounded-[1.5rem] bg-[rgba(215,192,154,0.22)] p-4 text-sm leading-8 text-[#4d4f42]">
            <b>منبع:</b> {activeStatus.source}
          </div>
        </div>
        {result?.improveActions?.length ? (
          <div className="rounded-[1.5rem] bg-white/70 p-4 text-sm leading-8 text-[var(--ink-soft)]">
            {result.improveActions.join(" | ")}
          </div>
        ) : null}
        <pre className="max-h-[680px] overflow-auto rounded-[1.5rem] bg-[#2f332b] p-5 text-left text-xs leading-6 text-[#f8f6f1] [direction:ltr]">
          {loading ? "Generating..." : result ? outputText : "بعد از تست، خروجی ساختارمند مغز سعیده اینجا دیده می‌شود."}
        </pre>
      </section>
    </div>
  );
}
