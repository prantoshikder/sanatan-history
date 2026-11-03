import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { deities, getDeity } from "@/data/deities";
import PageSkeleton from "@/components/PageSkeleton";

export function generateStaticParams() {
  return deities.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata(props: PageProps<"/devdevi/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const d = getDeity(slug);
  return d ? { title: d.name, description: d.role } : {};
}

export default function DeityPage(props: PageProps<"/devdevi/[slug]">) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <DeityContent params={props.params} />
    </Suspense>
  );
}

function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-border py-3 last:border-0">
      <dt className="text-xs font-semibold text-muted">{label}</dt>
      <dd className="mt-0.5">{children}</dd>
    </div>
  );
}

async function DeityContent({ params }: Pick<PageProps<"/devdevi/[slug]">, "params">) {
  const { slug } = await params;
  const d = getDeity(slug);
  if (!d) notFound();

  const idx = deities.indexOf(d);
  const prev = deities[(idx - 1 + deities.length) % deities.length];
  const next = deities[(idx + 1) % deities.length];
  const sameCategory = deities.filter((x) => x.category === d.category && x.slug !== d.slug);

  return (
    <article className="om-bg">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Link href="/devdevi" className="text-sm font-semibold text-saffron hover:underline">← সব দেব-দেবী</Link>

        <div className="mt-6 grid gap-10 lg:grid-cols-[380px_1fr]">
          <div className="lg:sticky lg:top-20 lg:self-start">
            <div className="relative aspect-[896/1184] overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
              <Image
                src={`/deity-art/${d.slug}.jpg`}
                alt={`${d.name} — চিত্র`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 380px"
                className="object-cover"
              />
            </div>
            <p className="mt-2 text-xs text-muted">চিত্র: AI দিয়ে তৈরি (Krea), ধ্রুপদী ভারতীয় ভক্তিচিত্রের ধাঁচে</p>

            <dl className="mt-6 rounded-2xl border border-border bg-card px-5 py-2 text-sm">
              <Fact label="বাহন">{d.vahana}</Fact>
              <Fact label="অস্ত্র ও প্রতীক">{d.symbols}</Fact>
              {d.consort && <Fact label="সঙ্গী / শক্তি">{d.consort}</Fact>}
              {d.abode && <Fact label="ধাম">{d.abode}</Fact>}
              {d.pujaDay && <Fact label="পূজার দিন">{d.pujaDay}</Fact>}
            </dl>
          </div>

          <div>
            <span className="rounded-full bg-saffron/15 px-3 py-1 text-xs font-semibold text-saffron">{d.category}</span>
            <h1 className="mt-3 font-serif text-4xl font-extrabold text-maroon md:text-6xl">{d.name}</h1>
            <p className="mt-2 text-sm text-muted">অন্য নাম: {d.otherNames.join(" · ")}</p>

            <div className="mt-6 rounded-2xl border border-saffron/40 bg-saffron/10 p-5">
              <p className="text-sm font-semibold text-saffron">কিসের দেবতা</p>
              <p className="mt-1 font-serif text-xl font-bold leading-relaxed">{d.role}</p>
            </div>

            <section className="mt-8">
              <h2 className="font-serif text-2xl font-bold text-maroon">কী কামনায় পূজা করা হয়</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {d.blessings.map((b) => (
                  <li key={b} className="flex gap-3 rounded-xl border border-border bg-card p-4">
                    <span className="text-saffron">🙏</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-10">
              <h2 className="font-serif text-2xl font-bold text-maroon">পরিচয়</h2>
              <div className="mt-4 space-y-4 text-lg leading-relaxed">
                {d.about.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </section>

            <section className="mt-10">
              <h2 className="font-serif text-2xl font-bold text-maroon">মন্ত্র</h2>
              <blockquote className="mt-4 rounded-xl border-l-4 border-saffron bg-card px-5 py-4">
                <p className="font-serif text-xl leading-relaxed">{d.mantra.text}</p>
                <p className="mt-2 text-sm text-muted">{d.mantra.meaning}</p>
              </blockquote>
            </section>

            <section className="mt-10">
              <h2 className="font-serif text-2xl font-bold text-maroon">উৎসব ও পূজা</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {d.festivals.map((f) => (
                  <span key={f} className="rounded-full border border-border bg-card px-4 py-2 text-sm">🪔 {f}</span>
                ))}
              </div>
            </section>

            <section className="mt-10">
              <h2 className="font-serif text-2xl font-bold text-maroon">কাহিনি</h2>
              <div className="mt-4 space-y-5">
                {d.stories.map((s) => (
                  <div key={s.title} className="rounded-2xl border border-border bg-card p-6">
                    <h3 className="font-serif text-xl font-bold">{s.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted">{s.text}</p>
                  </div>
                ))}
              </div>
            </section>

            {d.related && (
              <section className="mt-10">
                <h2 className="font-serif text-xl font-bold">আরও পড়ুন</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {d.related.map((r) => (
                    <Link key={r.href} href={r.href} className="rounded-full bg-saffron px-4 py-2 text-sm font-semibold text-white hover:opacity-90">
                      {r.label} →
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {sameCategory.length > 0 && (
              <section className="mt-12">
                <h2 className="font-serif text-xl font-bold">একই বিভাগের দেব-দেবী</h2>
                <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
                  {sameCategory.map((x) => (
                    <Link key={x.slug} href={`/devdevi/${x.slug}`} className="group text-center">
                      <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-border">
                        <Image src={`/deity-art/${x.slug}.jpg`} alt={x.name} fill sizes="140px" className="object-cover object-top" />
                      </div>
                      <p className="mt-1 text-sm font-semibold group-hover:text-saffron">{x.name}</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            <nav className="mt-12 grid gap-3 sm:grid-cols-2">
              <Link href={`/devdevi/${prev.slug}`} className="rounded-xl border border-border bg-card p-4 hover:border-saffron">
                <span className="text-xs text-muted">← আগের</span>
                <span className="block font-serif font-bold">{prev.name}</span>
              </Link>
              <Link href={`/devdevi/${next.slug}`} className="rounded-xl border border-border bg-card p-4 text-right hover:border-saffron">
                <span className="text-xs text-muted">পরের →</span>
                <span className="block font-serif font-bold">{next.name}</span>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </article>
  );
}
