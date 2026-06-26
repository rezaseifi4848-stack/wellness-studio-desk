import chakraExamples from "@/data/content/chakra-examples.json";
import classOpeningScripts from "@/data/content/class-opening-scripts.json";
import classPlans from "@/data/content/class-plans.json";
import contentIdeas from "@/data/content/content-ideas.json";
import contentTrends from "@/data/content/content-trends.json";
import dailySpeakingPractice from "@/data/content/daily-speaking-practice.json";
import exampleBank from "@/data/content/example-bank.json";
import meditationCaptions from "@/data/content/meditation-captions.json";
import meditationLibrary from "@/data/content/meditation-library.json";
import reelScripts from "@/data/content/reel-scripts.json";
import safetyRules from "@/data/content/safety-rules.json";
import speakingExercises from "@/data/content/speaking-exercises.json";
import storyTemplates from "@/data/content/story-templates.json";
import trendSources from "@/data/content/trend-sources.json";
import usefulLinks from "@/data/content/useful-links.json";

export type ContentItem = {
  title: string;
  tag?: string;
  duration?: string;
  level?: string;
  text?: string;
  prompt?: string;
  script?: string;
  caption?: string;
  example?: string;
  steps?: string[];
  bullets?: string[];
  opening?: string;
  focus?: string;
  source?: string;
  url?: string;
  status?: string;
  method?: string;
  reminder?: string;
  sections?: string[];
};

export type ContentCollection = {
  title: string;
  description: string;
  items: ContentItem[];
};

export const content = {
  chakraExamples: chakraExamples as ContentCollection,
  classOpeningScripts: classOpeningScripts as ContentCollection,
  classPlans: classPlans as ContentCollection,
  contentIdeas: contentIdeas as ContentCollection,
  contentTrends: contentTrends as ContentCollection,
  dailySpeakingPractice: dailySpeakingPractice as ContentCollection,
  exampleBank: exampleBank as ContentCollection,
  meditationCaptions: meditationCaptions as ContentCollection,
  meditationLibrary: meditationLibrary as ContentCollection,
  reelScripts: reelScripts as ContentCollection,
  safetyRules: safetyRules as ContentCollection,
  speakingExercises: speakingExercises as ContentCollection,
  storyTemplates: storyTemplates as ContentCollection,
  trendSources: trendSources as ContentCollection,
  usefulLinks: usefulLinks as ContentCollection,
};

export const safetyCopy =
  "این محتوا برای آموزش، آرام‌سازی و تمرین شخصی است و جایگزین مشاوره پزشکی یا درمان تخصصی نیست.";

export const brand = {
  name: "یوگا با سعیده 🌿",
  tagline:
    "آرامش چیزی نیست که پیدا شود؛\nآرامش چیزی است که به آن بازمی‌گردیم.",
};

export const contentFileNames = [
  "speaking-exercises.json",
  "example-bank.json",
  "chakra-examples.json",
  "story-templates.json",
  "reel-scripts.json",
  "meditation-captions.json",
  "class-opening-scripts.json",
  "content-ideas.json",
  "daily-speaking-practice.json",
  "trend-sources.json",
  "content-trends.json",
  "safety-rules.json",
  "useful-links.json",
  "class-plans.json",
  "meditation-library.json",
];
