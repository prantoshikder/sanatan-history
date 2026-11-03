import type { Chapter } from "../stories/types";

export type { Chapter };

/** একটি শাস্ত্রের পূর্ণ কাহিনি — /shastra/[slug] পাতায় দেখানো হয় */
export type ShastraStory = {
  slug: string;
  /** পাতার উপরে বড় করে দেখানো নাম, যেমন "ঋগ্বেদ" */
  title: string;
  /** এক লাইনের পরিচয় */
  tagline: string;
  intro: string;
  chapters: Chapter[];
  /** শেষে "এই শাস্ত্রের শিক্ষা" বাক্সে যাবে */
  closing: string;
};
