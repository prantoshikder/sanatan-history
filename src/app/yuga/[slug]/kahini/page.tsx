import { Suspense } from "react";
import PageSkeleton from "@/components/PageSkeleton";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getYuga, yugas } from "@/data/yugas";
import { getStory } from "@/data/stories";
import { bn } from "@/lib/bn";

export function generateStaticParams() {
  return yugas.map((y) => ({ slug: y.slug }));
}

export async function generateMetadata(props: PageProps<"/yuga/[slug]/kahini">): Promise<Metadata> {
  const { slug } = await props.params;
  const y = getYuga(slug);
  return y ? { title: `${y.name}ের পূর্ণ কাহিনি`, description: getStory(slug)?.intro } : {};
}

export default function KahiniPage(props: PageProps<"/yuga/[slug]/kahini">) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <KahiniContent params={props.params} />
    </Suspense>
  );
}

async function KahiniContent({ params }: Pick<PageProps<"/yuga/[slug]/kahini">, "params">) {
  const { slug } = await params;
  const y = getYuga(slug);
  const story = getStory(slug);
  if (!y || !story) notFound();

  const prev = yugas[y.order - 2];
  const next = yugas[y.order];
  const words = [story.intro, story.closing, ...story.chapters.flatMap((c) => c.paragraphs)]
    .join(" ")
    .split(/\s+/).length;
  const minutes = Math.ceil(words / 180);

  return (
    <article>
      <header className={`bg-gradient-to-br ${y.accent} text-white`}>
        <div className="mx-auto max-w-3xl px-4 py-14 text-center md:py-20">
          <Link href={`/yuga/${y.slug}`} className="text-sm font-semibold opacity-70 hover:opacity-100">
            ← {y.name}: তথ্য ও সারসংক্ষেপ
          </Link>
          <p className="mt-6 text-sm font-semibold uppercase tracking-widest opacity-70">পূর্ণ কাহিনি</p>
          <h1 className="mt-2 font-serif text-4xl font-extrabold md:text-6xl">{y.name}</h1>
          <p className="mt-3 text-lg opacity-80">{y.tagline}</p>
          <p className="mt-4 text-sm opacity-70">
            {bn(story.chapters.length)}টি অধ্যায় · প্রায় {bn(minutes)} মিনিটের পাঠ
          </p>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-[240px_1fr]">
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <details open className="rounded-2xl border border-border bg-card p-4">
            <summary className="cursor-pointer font-serif font-bold">সূচিপত্র</summary>
            <ol className="mt-3 space-y-1.5 text-sm">
              {story.chapters.map((c, i) => (
                <li key={c.title}>
                  <a href={`#ch${i + 1}`} className="flex gap-2 rounded px-1 py-0.5 text-muted hover:bg-saffron/10 hover:text-saffron">
                    <span className="w-5 shrink-0 text-saffron">{bn(i + 1)}</span>
                    <span>{c.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </details>
        </aside>

        <div className="mx-auto w-full max-w-2xl">
          <p className="font-serif text-xl leading-relaxed md:text-2xl md:leading-relaxed">{story.intro}</p>

          <div className="my-10 text-center text-2xl tracking-[1em] text-saffron">❖ ❖ ❖</div>

          {story.chapters.map((c, i) => (
            <section key={c.title} id={`ch${i + 1}`} className="scroll-mt-24 pb-12">
              <p className="text-sm font-semibold text-saffron">অধ্যায় {bn(i + 1)}</p>
              <h2 className="mt-1 font-serif text-2xl font-bold text-maroon md:text-3xl">{c.title}</h2>

              {c.verse && (
                <blockquote className="mt-5 rounded-xl border-l-4 border-saffron bg-saffron/10 px-5 py-4">
                  <p className="font-serif text-lg">{c.verse.text}</p>
                  <p className="mt-1 text-sm text-muted">{c.verse.meaning}</p>
                </blockquote>
              )}

              <div className="mt-5 space-y-5 text-lg leading-loose">
                {c.paragraphs.map((p, j) => (
                  <p
                    key={j}
                    className={
                      j === 0
                        ? "first-letter:float-left first-letter:mr-2 first-letter:font-serif first-letter:text-5xl first-letter:font-bold first-letter:leading-none first-letter:text-saffron"
                        : ""
                    }
                  >
                    {p}
                  </p>
                ))}
              </div>

              {i < story.chapters.length - 1 && (
                <div className="mt-10 text-center text-saffron/60">✦</div>
              )}
            </section>
          ))}

          <div className="rounded-2xl border border-saffron/40 bg-saffron/10 p-6">
            <p className="font-serif text-lg font-bold">এই যুগের শিক্ষা</p>
            <p className="mt-2 text-lg leading-relaxed">{story.closing}</p>
          </div>

          <nav className="mt-10 grid gap-3 sm:grid-cols-2">
            {prev ? (
              <Link href={`/yuga/${prev.slug}/kahini`} className="rounded-xl border border-border bg-card p-4 hover:border-saffron">
                <span className="text-xs text-muted">← আগের যুগ</span>
                <span className="block font-serif font-bold">{prev.name}ের কাহিনি</span>
              </Link>
            ) : <span />}
            {next ? (
              <Link href={`/yuga/${next.slug}/kahini`} className="rounded-xl border border-border bg-card p-4 text-right hover:border-saffron">
                <span className="text-xs text-muted">পরের যুগ →</span>
                <span className="block font-serif font-bold">{next.name}ের কাহিনি</span>
              </Link>
            ) : (
              <Link href="/yuga/satya/kahini" className="rounded-xl border border-border bg-card p-4 text-right hover:border-saffron">
                <span className="text-xs text-muted">কালচক্র আবার ঘোরে ↻</span>
                <span className="block font-serif font-bold">সত্য যুগে ফিরে চলুন</span>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </article>
  );
}
