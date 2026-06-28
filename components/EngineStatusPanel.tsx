type EngineStatusPanelProps = {
  status?: {
    aiActive?: boolean;
    searchActive?: boolean;
    outputMode?: string;
    lastGenerated?: string;
    source?: string;
    warning?: string;
  };
};

export function EngineStatusPanel({ status }: EngineStatusPanelProps) {
  const mode = status?.outputMode || "آفلاین محدود";

  return (
    <div className="rounded-[2rem] border border-[rgba(215,192,154,0.45)] bg-[rgba(255,253,248,0.9)] p-5 text-sm leading-8 text-[#5f5b4d]">
      <h3 className="text-lg font-semibold text-[#4d4f42]">وضعیت موتور</h3>
      <div className="mt-3 grid gap-2 md:grid-cols-2">
        <p><b>AI زنده:</b> {status?.aiActive ? "فعال" : "غیرفعال"}</p>
        <p><b>جستجوی زنده:</b> {status?.searchActive ? "فعال" : "غیرفعال"}</p>
        <p><b>حالت خروجی:</b> {mode}</p>
        <p><b>منبع تولید:</b> {status?.source || "Local fallback"}</p>
        <p className="md:col-span-2"><b>آخرین تولید:</b> {status?.lastGenerated ? new Date(status.lastGenerated).toLocaleString("fa-IR") : "هنوز تولید نشده"}</p>
      </div>
      {status?.warning ? (
        <p className="mt-3 rounded-3xl bg-[rgba(215,192,154,0.22)] px-4 py-3 text-[#6f5f3f]">
          {status.warning} حالت فعلی: «حالت آفلاین محدود»
        </p>
      ) : null}
    </div>
  );
}
