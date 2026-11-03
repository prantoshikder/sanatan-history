import Link from "next/link";
import type { Yuga } from "@/data/yugas";
import { bn } from "@/lib/bn";

export function DharmaLegs({ count }: { count: number }) {
  return (
    <span className="inline-flex gap-1" aria-label={`ধর্মের ${bn(count)} পা`}>
      {[1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className={`h-5 w-2 rounded-full ${i <= count ? "bg-saffron" : "bg-border"}`}
        />
      ))}
    </span>
  );
}

export default function YugaCard({ yuga }: { yuga: Yuga }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/yuga/${yuga.slug}`} className={`bg-gradient-to-br ${yuga.accent} px-5 py-6 text-white`}>
        <p className="text-xs font-semibold uppercase tracking-wider opacity-70">
          {bn(yuga.order)} নং যুগ
        </p>
        <h3 className="font-serif text-2xl font-bold">{yuga.name}</h3>
        <p className="text-sm opacity-80">{yuga.altName}</p>
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-5 text-sm">
        <p className="text-muted">{yuga.tagline}</p>
        <dl className="grid grid-cols-2 gap-2">
          <dt className="text-muted">স্থায়িত্ব</dt>
          <dd className="font-semibold">{yuga.humanYears} বছর</dd>
          <dt className="text-muted">ধর্ম</dt>
          <dd><DharmaLegs count={yuga.dharmaLegs} /></dd>
          <dt className="text-muted">আয়ু</dt>
          <dd className="font-semibold">{yuga.lifespan.replace("প্রায় ", "")}</dd>
          <dt className="text-muted">সাধনা</dt>
          <dd className="font-semibold">{yuga.sadhana}</dd>
        </dl>
        <div className="mt-auto flex flex-col gap-2 pt-3">
          <Link
            href={`/yuga/${yuga.slug}/kahini`}
            className="rounded-full bg-saffron px-4 py-2 text-center font-semibold text-white hover:opacity-90"
          >
            📖 পূর্ণ কাহিনি পড়ুন
          </Link>
          <Link href={`/yuga/${yuga.slug}`} className="text-center font-semibold text-saffron hover:underline">
            তথ্য ও সারসংক্ষেপ →
          </Link>
        </div>
      </div>
    </div>
  );
}
