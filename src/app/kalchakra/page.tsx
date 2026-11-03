import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { bn } from "@/lib/bn";

export const metadata: Metadata = { title: "কালচক্র — হিন্দু মহাজাগতিক সময়" };

const ladder = [
  { unit: "১ মানব বছর", equals: "দেবতাদের ১ দিন-রাত (উত্তরায়ণ = দিন, দক্ষিণায়ন = রাত)" },
  { unit: "১ দৈব বছর", equals: "৩৬০ মানব বছর" },
  { unit: "১ মহাযুগ (চতুর্যুগ)", equals: "১২,০০০ দৈব বছর = ৪৩,২০,০০০ মানব বছর" },
  { unit: "১ মন্বন্তর", equals: "৭১ মহাযুগ = ৩০,৬৭,২০,০০০ বছর (+ ১৭,২৮,০০০ বছরের সন্ধিকাল)" },
  { unit: "১ কল্প (ব্রহ্মার ১ দিন)", equals: "১৪ মন্বন্তর ≈ ১,০০০ মহাযুগ = ৪৩২ কোটি বছর" },
  { unit: "ব্রহ্মার ১ দিন-রাত", equals: "২ কল্প = ৮৬৪ কোটি বছর (রাতে প্রলয়)" },
  { unit: "ব্রহ্মার ১ বছর", equals: "৩৬০ দিন-রাত = ৩,১১,০৪০ কোটি বছর" },
  { unit: "ব্রহ্মার আয়ু (মহাকল্প / পর)", equals: "১০০ ব্রহ্মবর্ষ = ৩১,১০,৪০,০০০ কোটি বছর (৩১১.০৪ লক্ষ কোটি)" },
];

const manus = [
  "স্বায়ম্ভুব", "স্বারোচিষ", "উত্তম", "তামস", "রৈবত", "চাক্ষুষ", "বৈবস্বত",
  "সাবর্ণি", "দক্ষসাবর্ণি", "ব্রহ্মসাবর্ণি", "ধর্মসাবর্ণি", "রুদ্রসাবর্ণি", "দেবসাবর্ণি (রৌচ্য)", "ইন্দ্রসাবর্ণি (ভৌত্য)",
];

const now = [
  { k: "ব্রহ্মার বয়স", v: "৫১তম বছর — দ্বিতীয় পরার্ধ" },
  { k: "কল্প", v: "শ্বেতবরাহ কল্প (৫১তম বছরের প্রথম দিন)" },
  { k: "মন্বন্তর", v: "সপ্তম — বৈবস্বত মনু" },
  { k: "মহাযুগ", v: "২৮তম মহাযুগ" },
  { k: "যুগ", v: "কলি যুগ, প্রথম চরণ" },
  { k: "এই কল্পের অতিবাহিত কাল", v: "প্রায় ১৯৭ কোটি ২৯ লক্ষ বছর" },
];

export default function Kalchakra() {
  return (
    <>
      <PageHeader eyebrow="মহাজাগতিক সময়" title="কালচক্র">
        হিন্দু শাস্ত্রে মহাবিশ্ব বারবার সৃষ্টি, স্থিতি ও লয়ের মধ্য দিয়ে যায়। চার যুগ এই বিশাল কালচক্রের
        সবচেয়ে ছোট একক মাত্র। হিসাবগুলি বিষ্ণু পুরাণ, মনুস্মৃতি ও সূর্য সিদ্ধান্ত অনুসারে।
      </PageHeader>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="font-serif text-2xl font-bold text-maroon">সময়ের সিঁড়ি</h2>
        <div className="mt-6 space-y-3">
          {ladder.map((l, i) => (
            <div key={l.unit} className="flex flex-col gap-1 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-center" style={{ marginLeft: `${Math.min(i, 6) * 0.75}rem` }}>
              <span className="w-64 shrink-0 font-serif font-bold">{l.unit}</span>
              <span className="text-muted">= {l.equals}</span>
            </div>
          ))}
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="font-serif text-2xl font-bold text-maroon">আমরা এখন কোথায়?</h2>
            <p className="mt-2 text-muted">
              পূজার সংকল্পে আজও বলা হয় — “শ্বেতবরাহকল্পে বৈবস্বতমন্বন্তরে অষ্টাবিংশতিতমে কলিযুগে কলিপ্রথমচরণে…”
            </p>
            <dl className="mt-4 divide-y divide-border rounded-2xl border border-border bg-card">
              {now.map((n) => (
                <div key={n.k} className="flex justify-between gap-4 p-4">
                  <dt className="text-muted">{n.k}</dt>
                  <dd className="text-right font-semibold">{n.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-maroon">চতুর্দশ মনু</h2>
            <p className="mt-2 text-muted">প্রতি কল্পে ১৪ জন মনু পর্যায়ক্রমে মানবজাতির অধিপতি হন।</p>
            <ol className="mt-4 grid grid-cols-2 gap-2">
              {manus.map((m, i) => (
                <li
                  key={m}
                  className={`rounded-lg border p-3 text-sm ${i === 6 ? "border-saffron bg-saffron/15 font-bold" : "border-border bg-card"}`}
                >
                  {bn(i + 1)}. {m} {i === 6 && "← বর্তমান"}
                  {i < 6 && <span className="block text-xs text-muted">অতীত</span>}
                  {i > 6 && <span className="block text-xs text-muted">ভবিষ্যৎ</span>}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {[
            { t: "নৈমিত্তিক প্রলয়", d: "প্রতি কল্পের শেষে ব্রহ্মার রাত্রি শুরু হলে ত্রিলোক (ভূঃ, ভুবঃ, স্বঃ) জলে নিমজ্জিত হয়। ব্রহ্মা জেগে উঠলে আবার সৃষ্টি।" },
            { t: "প্রাকৃতিক প্রলয়", d: "ব্রহ্মার ১০০ বছর পূর্ণ হলে সমগ্র ব্রহ্মাণ্ড মূল প্রকৃতিতে বিলীন হয় — একে মহাপ্রলয়ও বলে।" },
            { t: "আত্যন্তিক প্রলয়", d: "জ্ঞান ও ভক্তির দ্বারা জীবের মোক্ষ — জন্ম-মৃত্যুর চক্র থেকে চিরমুক্তি।" },
          ].map((p) => (
            <div key={p.t} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-serif text-lg font-bold">{p.t}</h3>
              <p className="mt-2 text-sm text-muted">{p.d}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
