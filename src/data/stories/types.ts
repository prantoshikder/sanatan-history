export type Chapter = {
  title: string;
  verse?: { text: string; meaning: string };
  paragraphs: string[];
};

export type YugaStory = {
  slug: string;
  intro: string;
  chapters: Chapter[];
  closing: string;
};
