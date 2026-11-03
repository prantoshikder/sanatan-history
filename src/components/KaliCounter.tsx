"use client";

import { useSyncExternalStore } from "react";
import { kaliElapsed } from "@/data/yugas";
import { bn } from "@/lib/bn";

const TOTAL = 432000;

export default function KaliCounter() {
  const year = useSyncExternalStore(
    () => () => {},
    () => new Date().getFullYear(),
    () => null,
  );

  const elapsed = year ? kaliElapsed(year) : null;
  const pct = elapsed ? (elapsed / TOTAL) * 100 : 0;

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <p className="text-sm font-semibold text-saffron">আমরা এখন কোথায়?</p>
      <h3 className="mt-1 font-serif text-2xl font-bold">কলি যুগের অগ্রগতি</h3>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <div>
          <p className="text-sm text-muted">অতিবাহিত (প্রায়)</p>
          <p className="font-serif text-3xl font-bold text-maroon">
            {elapsed ? bn(elapsed) : "…"} <span className="text-base">বছর</span>
          </p>
        </div>
        <div>
          <p className="text-sm text-muted">বাকি (প্রায়)</p>
          <p className="font-serif text-3xl font-bold">
            {elapsed ? bn(TOTAL - elapsed) : "…"} <span className="text-base">বছর</span>
          </p>
        </div>
        <div>
          <p className="text-sm text-muted">শুরু</p>
          <p className="font-serif text-3xl font-bold">খ্রি.পূ. {bn(3102, false)}</p>
        </div>
      </div>
      <div className="mt-5 h-3 overflow-hidden rounded-full bg-border">
        <div className="h-full rounded-full bg-saffron" style={{ width: `${Math.max(pct, 0.6)}%` }} />
      </div>
      <p className="mt-2 text-sm text-muted">
        মোট ৪,৩২,০০০ বছরের মাত্র {elapsed ? bn(pct.toFixed(2), false) : "…"}% পার হয়েছে — ঐতিহ্যগত গণনা অনুযায়ী আমরা এখনও কলির প্রথম চরণে।
      </p>
    </div>
  );
}
