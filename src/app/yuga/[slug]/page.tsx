import { Suspense } from "react";
import PageSkeleton from "@/components/PageSkeleton";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getYuga, yugas } from "@/data/yugas";
import { DharmaLegs } from "@/components/YugaCard";
import { bn } from "@/lib/bn";

export function generateStaticParams() {
  return yugas.map((y) => ({ slug: y.slug }));
}

export async function generateMetadata(props: PageProps<"/yuga/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const y = getYuga(slug);
  return y ? { title: y.name, description: y.tagline } : {};
}

function Fact({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <p className="text-xs text-muted">{label}</p>
      <div className="mt-1 font-semibold">{value}</div>
    </div>
  );
}

export default function YugaPage(props: PageProps<"/yuga/[slug]">) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <YugaContent params={props.params} />
    </Suspense>
  );
}

async function YugaContent({ params }: Pick<PageProps<"/yuga/[slug]">, "params">) {
  const { slug } = await params;
  const y = getYuga(slug);
  if (!y) notFound();

  const prev = yugas[y.order - 2];
  const next = yugas[y.order];
  const { main, sandhya, sandhyamsha } = y.divineYears;
  const totalDivine = main + sandhya + sandhyamsha;

  return (
    <article>
      <section className={`bg-gradient-to-br ${y.accent} text-white`}>
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <Link href="/yuga" className="text-sm font-semibold opacity-70 hover:opacity-100">← চার যুগ</Link>
          <p className="mt-4 text-sm font-semibold uppercase tracking-wider opacity-70">
            চতুর্যুগের {bn(y.order)} নং যুগ · {y.altName}
          </p>
          <h1 className="font-serif text-4xl font-extrabold md:text-6xl">{y.name}</h1>
          <p className="mt-3 max-w-2xl text-lg opacity-80">{y.tagline}</p>
          <Link
            href={`/yuga/${y.slug}/kahini`}
            className="mt-6 inline-block rounded-full bg-white px-6 py-3 font-semibold text-stone-900 shadow hover:opacity-90"
          >
            📖 {y.name}ের পূর্ণ কাহিনি পড়ুন
          </Link>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-[1fr_320px]">
        <div className="space-y-12">
          <section>
            <h2 className="font-serif text-2xl font-bold text-maroon">পরিচিতি</h2>
            <div className="mt-4 space-y-4 text-lg">
              {y.overview.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-maroon">ধর্মের অবস্থা</h2>
            <div className="mt-4 flex items-center gap-4 rounded-xl border border-border bg-card p-5">
              <DharmaLegs count={y.dharmaLegs} />
              <p>{y.dharmaLegsNote}</p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-maroon">যুগের বৈশিষ্ট্য</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {y.characteristics.map((c) => (
                <li key={c} className="flex gap-3 rounded-xl border border-border bg-card p-4">
                  <span className="text-saffron">✦</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-maroon">প্রধান ঘটনাবলি</h2>
            <ol className="relative mt-6 space-y-8 border-l-2 border-saffron/40 pl-6">
              {y.events.map((e, i) => (
                <li key={e.title} className="relative">
                  <span className="absolute -left-[35px] flex h-7 w-7 items-center justify-center rounded-full bg-saffron text-xs font-bold text-white">
                    {bn(i + 1)}
                  </span>
                  <h3 className="font-serif text-xl font-bold">{e.title}</h3>
                  <p className="mt-2 text-muted">{e.description}</p>
                </li>
              ))}
            </ol>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-maroon">উল্লেখযোগ্য ব্যক্তিত্ব</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {y.figures.map((f) => (
                <div key={f.name} className="rounded-xl border border-border bg-card p-4">
                  <p className="font-semibold">{f.name}</p>
                  <p className="text-sm text-muted">{f.role}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-saffron/40 bg-saffron/10 p-6">
            <h2 className="font-serif text-xl font-bold">যুগধর্ম: {y.sadhana}</h2>
            <p className="mt-2">{y.sadhanaVerse}</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-maroon">যুগের অবসান</h2>
            <p className="mt-3 text-lg">{y.ending}</p>
          </section>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
          <div className="grid grid-cols-2 gap-3">
            <Fact label="মানব বছর" value={y.humanYears} />
            <Fact label="দৈব বছর" value={bn(totalDivine)} />
            <Fact label="মূল কাল" value={`${bn(main)} দৈব বছর`} />
            <Fact label="সন্ধ্যা + সন্ধ্যাংশ" value={`${bn(sandhya)} + ${bn(sandhyamsha)}`} />
          </div>
          <Fact label="মানুষের আয়ু" value={y.lifespan} />
          <Fact label="দেহের উচ্চতা" value={y.height} />
          <Fact label="প্রাণের অবস্থান" value={y.pranaSthiti} />
          <Fact label="শ্রেষ্ঠ তীর্থ" value={y.tirtha} />
          <Fact label="ভগবানের বর্ণ (ভাগবত ১১.৫)" value={y.vishnuColor} />
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs text-muted">এই যুগের অবতার</p>
            <ul className="mt-2 space-y-1">
              {y.avatars.map((a) => (
                <li key={a.slug}>
                  <Link href={`/avatar#${a.slug}`} className="font-semibold text-saffron hover:underline">{a.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs text-muted">মূল শাস্ত্রসূত্র</p>
            <ul className="mt-2 list-disc space-y-1 pl-4 text-sm">
              {y.scriptures.map((s) => <li key={s}>{s}</li>)}
            </ul>
          </div>
        </aside>
      </div>

      <nav className="mx-auto flex max-w-6xl justify-between gap-4 px-4">
        {prev ? (
          <Link href={`/yuga/${prev.slug}`} className="rounded-xl border border-border bg-card px-5 py-3 hover:border-saffron">
            ← {prev.name}
          </Link>
        ) : <span />}
        {next ? (
          <Link href={`/yuga/${next.slug}`} className="rounded-xl border border-border bg-card px-5 py-3 hover:border-saffron">
            {next.name} →
          </Link>
        ) : (
          <Link href="/yuga/satya" className="rounded-xl border border-border bg-card px-5 py-3 hover:border-saffron">
            আবার সত্য যুগ (কালচক্র) ↻
          </Link>
        )}
      </nav>
    </article>
  );
}
