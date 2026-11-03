import { vedaStories } from "./veda";
import { upanishadStories } from "./upanishad";
import { ramayanaStory } from "./ramayana";
import { mahabharataStory } from "./mahabharata";
import { gitaStory } from "./gita";
import { puranaStories } from "./purana";
import { darshanStories } from "./darshan";
import { otherStories } from "./other";
import { scriptureGroups } from "../scriptures";

export type { ShastraStory } from "./types";

export const shastraStories = [
  ...vedaStories,
  ...upanishadStories,
  ramayanaStory,
  mahabharataStory,
  gitaStory,
  ...puranaStories,
  ...darshanStories,
  ...otherStories,
];

export function getShastraStory(slug: string) {
  return shastraStories.find((s) => s.slug === slug);
}

/** শাস্ত্র পাতার ক্রম অনুযায়ী সব slug — আগের/পরের নেভিগেশনের জন্য */
export const shastraOrder = scriptureGroups.flatMap((g) =>
  g.items.map((it) => ({ slug: it.slug, name: it.name, group: g.title })),
);
