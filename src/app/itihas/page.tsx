import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { eras } from "@/data/history";

export const metadata: Metadata = { title: "ঐতিহাসিক সময়রেখা" };

export default function ItihasPage() {
  return (
    <>
      <PageHeader eyebrow="গবেষণাভিত্তিক ইতিহাস" title="হিন্দু ধর্মের ঐতিহাসিক সময়রেখা">
        হিন্দু ধর্মের কোনো একক প্রতিষ্ঠাতা বা নির্দিষ্ট শুরুর তারিখ নেই — তাই একে ‘সনাতন’ (চিরন্তন) ধর্ম বলা হয়।
        নিচের সময়রেখা ইতিহাসবিদ ও প্রত্নতাত্ত্বিকদের আনুমানিক তারিখ অনুসারে। ঐতিহ্যগত যুগ-গণনার জন্য{" "}
        <Link href="/yuga" className="font-semibold text-saffron hover:underline">চার যুগ</Link> পাতা দেখুন।
      </PageHeader>

      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="mb-10 rounded-2xl border border-border bg-card p-5 text-sm text-muted">
          <strong className="text-foreground">দুটি দৃষ্টিভঙ্গি:</strong> ঐতিহ্যগত মতে কলি যুগ শুরু হয় খ্রি.পূ. ৩১০২ সালে, এবং রামায়ণ-মহাভারতের
          ঘটনা তার আগের। আধুনিক গবেষকরা গ্রন্থগুলির লিখিত রূপের সময় নির্ধারণ করেন ভাষা, প্রত্নতত্ত্ব ও শিলালিপির ভিত্তিতে।
          দুটি দৃষ্টিভঙ্গিই এখানে আলাদা করে রাখা হয়েছে।
        </div>

        <ol className="relative border-l-2 border-saffron/40">
          {eras.map((e) => (
            <li key={e.title} className="relative mb-12 pl-8 last:mb-0">
              <span className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-4 border-background bg-saffron" />
              <p className="text-sm font-semibold text-saffron">{e.period}</p>
              <h2 className="font-serif text-2xl font-bold">{e.title}</h2>
              <p className="mt-2 text-muted">{e.summary}</p>
              <ul className="mt-4 space-y-2">
                {e.points.map((p) => (
                  <li key={p} className="flex gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm">
                    <span className="text-saffron">•</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
