import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import DeityGallery from "@/components/DeityGallery";

export const metadata: Metadata = {
  title: "দেব-দেবী",
  description: "হিন্দু দেব-দেবীদের ছবি ও পরিচয় — কোন দেবতা কিসের জন্য পূজিত, বাহন, মন্ত্র, উৎসব ও কাহিনি।",
};

export default function DevdeviPage() {
  return (
    <>
      <PageHeader eyebrow="ছবিতে পরিচয়" title="দেব-দেবী">
        কোন দেবতা কিসের জন্য, কী কামনায় তাঁর পূজা হয়, তাঁর বাহন, মন্ত্র, উৎসব আর কাহিনি — যেকোনো ছবিতে ক্লিক করে
        বিস্তারিত দেখুন।
      </PageHeader>
      <section className="mx-auto max-w-6xl px-4 py-10">
        <DeityGallery />
        <p className="mt-12 text-xs text-muted">
          ছবিগুলি AI (Krea) দিয়ে তৈরি, ধ্রুপদী ভারতীয় ভক্তিচিত্রের ধাঁচে — প্রতিটি দেবতার বাহন ও প্রতীক সহ।
        </p>
      </section>
    </>
  );
}
