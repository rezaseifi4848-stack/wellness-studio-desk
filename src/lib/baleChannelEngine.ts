import { baleContentPacks } from "@/src/data/baleContentPacks";

export function getBaleSuggestions(limit = 10) {
  return baleContentPacks.slice(0, limit);
}

export function formatBalePack(title: string, text: string) {
  return `${title}\n\n${text}\n\n@yoga_saeedeh`;
}
