import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageSkeleton from "@/components/PageSkeleton";
import { getShastraStory, shastraOrder, shastraStories } from "@/data/shastra-kahini";
import { bn } from "@/lib/bn";

export function generateStaticParams() {
  return shastraStories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(props: PageProps<"/shastra/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const s = getShastraStory(slug);
  return s ? { title: `${s.title} — পূর্ণ কাহিনি`, description: s.tagline } : {};
}

export default function ShastraKahiniPage(props: PageProps<"/shastra/[slug]">) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <ShastraKahiniContent params={props.params} />
    </Suspense>
  );
}

async function ShastraKahiniContent({ params }: Pick<PageProps<"/shastra/[slug]">, "params">) {
  const { slug } = await params;
  const story = getShastraStory(slug);
  if (!story) notFound();

  const idx = shastraOrder.findIndex((x) => x.slug === slug);
  const meta = shastraOrder[idx];
  const prev = idx > 0 ? shastraOrder[idx - 1] : undefined;
  const next = idx < shastraOrder.length - 1 ? shastraOrder[idx + 1] : undefined;
  const words = [story.intro, story.closing, ...story.chapters.flatMap((c) => c.paragraphs)]
    .join(" ")
    .split(/\s+/).length;
  const minutes = Math.ceil(words / 180);

  return (
    <article>
      <header className="bg-gradient-to-br from-orange-800 via-red-900 to-stone-950 text-white">
        <div className="mx-auto max-w-3xl px-4 py-14 text-center md:py-20">
          <Link href="/shastra" className="text-sm font-semibold opacity-70 hover:opacity-100">
            ← সব শাস্ত্র
          </Link>
          {meta && <p className="mt-6 text-sm font-semibold uppercase tracking-widest opacity-70">{meta.group}</p>}
          <h1 className="mt-2 font-serif text-4xl font-extrabold md:text-6xl">{story.title}</h1>
          <p className="mt-3 text-lg opacity-80">{story.tagline}</p>
          <p className="mt-4 text-sm opacity-70">
            {bn(story.chapters.length)}টি অধ্যায় · প্রায় {bn(minutes)} মিনিটের পাঠ
          </p>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-[240px_1fr]">
        <aside className="lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:self-start lg:overflow-y-auto">
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
                  <p className="whitespace-pre-line font-serif text-lg">{c.verse.text}</p>
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

              {i < story.chapters.length - 1 && <div className="mt-10 text-center text-saffron/60">✦</div>}
            </section>
          ))}

          <div className="rounded-2xl border border-saffron/40 bg-saffron/10 p-6">
            <p className="font-serif text-lg font-bold">এই শাস্ত্রের শিক্ষা</p>
            <p className="mt-2 text-lg leading-relaxed">{story.closing}</p>
          </div>

          <nav className="mt-10 grid gap-3 sm:grid-cols-2">
            {prev ? (
              <Link href={`/shastra/${prev.slug}`} className="rounded-xl border border-border bg-card p-4 hover:border-saffron">
                <span className="text-xs text-muted">← আগের শাস্ত্র</span>
                <span className="block font-serif font-bold">{prev.name}</span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link href={`/shastra/${next.slug}`} className="rounded-xl border border-border bg-card p-4 text-right hover:border-saffron">
                <span className="text-xs text-muted">পরের শাস্ত্র →</span>
                <span className="block font-serif font-bold">{next.name}</span>
              </Link>
            ) : (
              <Link href="/shastra" className="rounded-xl border border-border bg-card p-4 text-right hover:border-saffron">
                <span className="text-xs text-muted">শেষ</span>
                <span className="block font-serif font-bold">সব শাস্ত্রে ফিরে চলুন</span>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </article>
  );
}
