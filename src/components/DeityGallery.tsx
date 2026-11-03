"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { deities, deityCategories, type DeityCategory } from "@/data/deities";
import { bn } from "@/lib/bn";

export default function DeityGallery() {
  const [cat, setCat] = useState<DeityCategory | "সব">("সব");
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    return deities.filter((d) => {
      if (cat !== "সব" && d.category !== cat) return false;
      if (!term) return true;
      return [d.name, d.role, ...d.otherNames, ...d.blessings, d.slug].join(" ").toLowerCase().includes(term);
    });
  }, [cat, q]);

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {(["সব", ...deityCategories] as const).map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                cat === c ? "border-saffron bg-saffron text-white" : "border-border bg-card hover:border-saffron"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="খুঁজুন: নাম, বা ‘বিদ্যা’, ‘ধন’, ‘বিপদ’…"
          className="w-full rounded-full border border-border bg-card px-4 py-2 text-sm outline-none focus:border-saffron md:w-80"
        />
      </div>

      <p className="mt-4 text-sm text-muted">{bn(list.length)} জন দেব-দেবী</p>

      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {list.map((d) => (
          <Link
            key={d.slug}
            href={`/devdevi/${d.slug}`}
            className="group overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-1 hover:border-saffron hover:shadow-lg"
          >
            <div className="relative aspect-[896/1184] overflow-hidden bg-border/40">
              <Image
                src={`/deity-art/${d.slug}.jpg`}
                alt={`${d.name} — চিত্র`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover object-center transition duration-500 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
              <span className="absolute bottom-2 left-2 rounded-full bg-black/60 px-2 py-0.5 text-[11px] text-white backdrop-blur">
                {d.category}
              </span>
            </div>
            <div className="p-4">
              <h2 className="font-serif text-xl font-bold group-hover:text-saffron">{d.name}</h2>
              <p className="mt-1 line-clamp-3 text-sm text-muted">{d.role}</p>
            </div>
          </Link>
        ))}
      </div>

      {list.length === 0 && (
        <p className="mt-10 text-center text-muted">কিছু পাওয়া যায়নি। অন্য শব্দ দিয়ে খুঁজে দেখুন।</p>
      )}
    </>
  );
}
