import { commentBanks } from "@/src/data/commentBanks";

export function getEngagementPack() {
  return commentBanks;
}

export function getTopEngagementSuggestions() {
  return {
    comments: commentBanks.warmComments.slice(0, 10),
    replies: commentBanks.followerReplies.slice(0, 10),
    dmOpeners: commentBanks.dmOpeners.slice(0, 10),
    startAnswers: commentBanks.startAnswers.slice(0, 10),
  };
}
