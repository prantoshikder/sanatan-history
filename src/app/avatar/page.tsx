import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { avatars } from "@/data/avatars";
import { bn } from "@/lib/bn";

export const metadata: Metadata = { title: "দশাবতার" };

export default function AvatarPage() {
  return (
    <>
      <PageHeader eyebrow="ভগবান বিষ্ণুর দশ অবতার" title="দশাবতার">
        ধর্ম রক্ষা ও অধর্ম নাশের জন্য বিষ্ণু যুগে যুগে অবতীর্ণ হন। শ্রীমদ্ভাগবতে ২২টি অবতারের কথা আছে, তবে
        দশটি প্রধান অবতার ‘দশাবতার’ নামে সবচেয়ে প্রসিদ্ধ। মজার বিষয় — জলচর মাছ থেকে উভচর কচ্ছপ, স্থলচর বরাহ,
        অর্ধ-মানব, বামন মানুষ, পূর্ণ মানুষ — এই ক্রম অনেকের কাছে প্রাণের বিবর্তনের প্রতীক বলে মনে হয়।
      </PageHeader>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="space-y-6">
          {avatars.map((a) => (
            <article
              key={a.slug}
              id={a.slug}
              className="scroll-mt-24 grid gap-5 rounded-2xl border border-border bg-card p-6 md:grid-cols-[120px_1fr]"
            >
              <div className="flex flex-col items-center justify-center rounded-xl bg-saffron/10 p-4">
                <span className="text-5xl">{a.symbol}</span>
                <span className="mt-2 font-serif text-2xl font-bold text-saffron">{bn(a.number)}</span>
              </div>
              <div>
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <h2 className="font-serif text-2xl font-bold">{a.name}</h2>
                  <span className="text-sm text-muted">{a.form}</span>
                </div>
                <Link href={`/yuga/${a.yugaSlug}`} className="mt-1 inline-block rounded-full bg-saffron/15 px-3 py-0.5 text-xs font-semibold text-saffron hover:underline">
                  {a.yuga}
                </Link>
                <p className="mt-3 font-semibold">উদ্দেশ্য: {a.purpose}</p>
                <p className="mt-2 text-muted">{a.story}</p>
              </div>
            </article>
          ))}
        </div>

        <blockquote className="mt-12 rounded-2xl border border-saffron/40 bg-saffron/10 p-6 text-center">
          <p className="font-serif text-lg">
            পরিত্রাণায় সাধূনাং বিনাশায় চ দুষ্কৃতাম্।<br />ধর্মসংস্থাপনার্থায় সম্ভবামি যুগে যুগে॥
          </p>
          <p className="mt-2 text-sm text-muted">
            “সাধুদের রক্ষা, দুষ্কৃতীদের বিনাশ এবং ধর্ম প্রতিষ্ঠার জন্য আমি যুগে যুগে অবতীর্ণ হই।” — গীতা ৪.৮
          </p>
        </blockquote>
      </section>
    </>
  );
}
