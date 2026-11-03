import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { yugas } from "@/data/yugas";
import { getStory } from "@/data/stories";
import { bn } from "@/lib/bn";

export const metadata: Metadata = { title: "চার যুগের কাহিনি" };

export default function KahiniIndex() {
  return (
    <>
      <PageHeader eyebrow="গল্পের মতো করে পড়ুন" title="চার যুগের পূর্ণ কাহিনি">
        মৎস্য অবতারের প্রলয়ের নৌকা থেকে কল্কির সাদা ঘোড়া পর্যন্ত, সত্য থেকে কলি, পুরো কালচক্রের কাহিনি
        অধ্যায়ে অধ্যায়ে সাজানো।
      </PageHeader>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-12 md:grid-cols-2">
        {yugas.map((y) => {
          const s = getStory(y.slug)!;
          return (
            <Link
              key={y.slug}
              href={`/yuga/${y.slug}/kahini`}
              className="group overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className={`bg-gradient-to-br ${y.accent} px-6 py-6 text-white`}>
                <p className="text-xs font-semibold opacity-70">{bn(y.order)} নং যুগ · {bn(s.chapters.length)}টি অধ্যায়</p>
                <h2 className="font-serif text-3xl font-bold">{y.name}</h2>
              </div>
              <div className="p-6">
                <p className="line-clamp-3 text-muted">{s.intro}</p>
                <ol className="mt-4 flex flex-wrap gap-2 text-xs">
                  {s.chapters.map((c) => (
                    <li key={c.title} className="rounded-full border border-border px-2.5 py-1">{c.title}</li>
                  ))}
                </ol>
                <span className="mt-5 inline-block font-semibold text-saffron group-hover:underline">কাহিনি পড়ুন →</span>
              </div>
            </Link>
          );
        })}
      </section>
    </>
  );
}
