import { buildAiBrainPrompt } from "@/src/lib/aiBrainPrompt";
import type { SaeedehBrainMode } from "@/src/data/saeedehBrainConfig";

export type LiveGenerateRequest = {
  module?: string;
  channel?: string;
  outputType?: string;
  persona?: string;
  topic?: string;
  platform?: "Bale" | "Instagram" | "both" | string;
  contentGoal?: string;
  level?: "pro" | "premium" | "elite" | string;
  freshness?: "today" | "this week" | "evergreen" | string;
  meditationFocus?: string;
  posterStyle?: string;
  userSeedText?: string;
  improveAction?: string;
  brainMode?: SaeedehBrainMode | string;
  strictPublishReady?: boolean;
};

export function buildPremiumPrompt(input: LiveGenerateRequest, searchSignals: string[]) {
  return buildAiBrainPrompt(input, searchSignals);
}
