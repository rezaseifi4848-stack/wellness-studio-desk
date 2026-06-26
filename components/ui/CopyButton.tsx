"use client";

import { useState } from "react";

type CopyButtonProps = {
  text: string;
};

export function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <button
      className="calm-focus rounded-full border border-[var(--line)] bg-[var(--warm-white)] px-4 py-2 text-xs font-semibold text-[#655c48] transition hover:border-[var(--gold)] hover:bg-[var(--gold-soft)]"
      onClick={handleCopy}
      type="button"
    >
      {copied ? "کپی شد قشنگم" : "کپی کن"}
    </button>
  );
}
