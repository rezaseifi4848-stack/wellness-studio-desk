import { safetyCopy } from "@/lib/content";

export function SafetyNotice() {
  return (
    <aside className="soft-panel border-[var(--gold)] bg-[rgba(238,224,197,0.58)] p-5">
      <p className="text-sm font-semibold text-[#6d6149]">یه یادآوری مهربون</p>
      <p className="mt-2 text-sm leading-7 text-[#625f53]">{safetyCopy}</p>
    </aside>
  );
}
