import { affirmationChallenges } from "@/src/data/affirmationChallenges";

export function getAffirmationChallenge(title?: string) {
  return affirmationChallenges.find((challenge) => challenge.title === title) ?? affirmationChallenges[0];
}

export function getTodayAffirmations() {
  return affirmationChallenges.map((challenge) => challenge.days[0].affirmation).slice(0, 10);
}
