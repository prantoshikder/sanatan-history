import { satyaStory } from "./satya";
import { tretaStory } from "./treta";
import { dwaparaStory } from "./dwapara";
import { kaliStory } from "./kali";

export type { Chapter, YugaStory } from "./types";

export const stories = [satyaStory, tretaStory, dwaparaStory, kaliStory];

export function getStory(slug: string) {
  return stories.find((s) => s.slug === slug);
}
