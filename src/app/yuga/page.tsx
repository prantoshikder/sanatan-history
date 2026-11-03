import type { Metadata } from "next";
import { yugas } from "@/data/yugas";
import YugaCard, { DharmaLegs } from "@/components/YugaCard";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";

export const metadata: Metadata = { title: "চার যুগ" };

const rows: { label: string; get: (y: (typeof yugas)[number]) => React.ReactNode }[] = [
  { label: "অন্য নাম", get: (y) => y.altName },
  { label: "মানব বছর", get: (y) => y.humanYears },
  { label: "ধর্মের পা", get: (y) => <DharmaLegs count={y.dharmaLegs} /> },
  { label: "মানুষের আয়ু", get: (y) => y.lifespan },
  { label: "উচ্চতা", get: (y) => y.height.replace(" (লোকপ্রচলিত বিশ্বাস)", "") },
  { label: "প্রাণের আশ্রয়", get: (y) => y.pranaSthiti.split(" — ")[0] },
  { label: "মুক্তির সাধনা", get: (y) => y.sadhana },
  { label: "শ্রেষ্ঠ তীর্থ", get: (y) => y.tirtha },
  { label: "ভগবানের বর্ণ", get: (y) => y.vishnuColor },
  { label: "অবতার", get: (y) => y.avatars.map((a) => a.name.replace(" অবতার", "")).join(", ") },
];

export default function YugaIndex() {
  return (
    <>
      <PageHeader eyebrow="চতুর্যুগ" title="চার যুগ — সত্য, ত্রেতা, দ্বাপর ও কলি">
        প্রতিটি যুগ শুরু হয় ‘সন্ধ্যা’ দিয়ে এবং শেষ হয় ‘সন্ধ্যাংশ’ দিয়ে — অনেকটা ভোর ও গোধূলির মতো।
        নিচে চার যুগের তুলনা দেওয়া হল; যেকোনো যুগে ক্লিক করে বিস্তারিত পড়ুন।
      </PageHeader>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {yugas.map((y) => (
            <YugaCard key={y.slug} yuga={y} />
          ))}
        </div>

        <h2 className="mt-16 font-serif text-2xl font-bold">তুলনামূলক সারণি</h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="p-4 text-muted">বিষয়</th>
                {yugas.map((y) => (
                  <th key={y.slug} className="p-4 font-serif text-base">
                    <Link href={`/yuga/${y.slug}`} className="hover:text-saffron">{y.name}</Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.label} className="border-b border-border last:border-0">
                  <td className="p-4 font-semibold text-muted">{r.label}</td>
                  {yugas.map((y) => (
                    <td key={y.slug} className="p-4">{r.get(y)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-muted">
          আয়ু ও উচ্চতার হিসাব পুরাণ ও লোকপ্রচলিত বিশ্বাস অনুযায়ী; বিভিন্ন গ্রন্থে সংখ্যায় পার্থক্য আছে।
        </p>
      </section>
    </>
  );
}
