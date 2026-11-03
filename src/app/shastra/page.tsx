import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { scriptureGroups } from "@/data/scriptures";

export const metadata: Metadata = { title: "শাস্ত্র" };

export default function ShastraPage() {
  return (
    <>
      <PageHeader eyebrow="ধর্মগ্রন্থ" title="হিন্দু শাস্ত্র পরিচিতি">
        হিন্দু শাস্ত্র মূলত দুই ভাগে বিভক্ত — <strong>শ্রুতি</strong> (বেদ ও উপনিষদ, যা ঈশ্বরপ্রকাশিত বলে মানা হয়)
        এবং <strong>স্মৃতি</strong> (মহাকাব্য, পুরাণ, ধর্মশাস্ত্র — যা ঋষিরা স্মরণ করে রচনা করেছেন)। শ্রুতিই সর্বোচ্চ প্রমাণ।
      </PageHeader>

      <div className="mx-auto max-w-6xl px-4 py-6">
        <nav className="flex flex-wrap gap-2">
          {scriptureGroups.map((g, i) => (
            <a key={g.title} href={`#g${i}`} className="rounded-full border border-border bg-card px-4 py-1.5 text-sm hover:border-saffron">
              {g.title}
            </a>
          ))}
        </nav>
      </div>

      <div className="mx-auto max-w-6xl space-y-14 px-4 py-6">
        {scriptureGroups.map((g, i) => (
          <section key={g.title} id={`g${i}`} className="scroll-mt-24">
            <p className="text-sm font-semibold text-saffron">{g.subtitle}</p>
            <h2 className="font-serif text-3xl font-bold text-maroon">{g.title}</h2>
            <p className="mt-3 max-w-3xl text-muted">{g.description}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {g.items.map((it) => (
                <Link
                  key={it.name}
                  href={`/shastra/${it.slug}`}
                  className="group flex flex-col rounded-xl border border-border bg-card p-5 transition hover:-translate-y-0.5 hover:border-saffron hover:shadow-md"
                >
                  <h3 className="font-serif text-lg font-bold group-hover:text-saffron">{it.name}</h3>
                  <p className="mt-1 flex-1 text-sm text-muted">{it.detail}</p>
                  <span className="mt-4 text-sm font-semibold text-saffron">📖 পূর্ণ কাহিনি পড়ুন →</span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
