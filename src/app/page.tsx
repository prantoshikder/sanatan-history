import Link from "next/link";
import { yugas } from "@/data/yugas";
import { avatars } from "@/data/avatars";
import YugaCard from "@/components/YugaCard";
import KaliCounter from "@/components/KaliCounter";
import { bn } from "@/lib/bn";

const sections = [
  { href: "/devdevi", title: "দেব-দেবী", text: "ছবিসহ সব দেব-দেবীর পরিচয় — কে কিসের দেবতা, বাহন, মন্ত্র, উৎসব ও কাহিনি।", icon: "🛕" },
  { href: "/kalchakra", title: "কালচক্র", text: "মহাযুগ, মন্বন্তর, কল্প ও ব্রহ্মার আয়ু — হিন্দু মহাজাগতিক সময়ের হিসাব।", icon: "☸️" },
  { href: "/avatar", title: "দশাবতার", text: "মৎস্য থেকে কল্কি — বিষ্ণুর দশ অবতার ও কোন যুগে তাঁদের আবির্ভাব।", icon: "🪷" },
  { href: "/shastra", title: "শাস্ত্র", text: "বেদ, উপনিষদ, রামায়ণ, মহাভারত, গীতা, পুরাণ ও ষড়দর্শন।", icon: "📜" },
  { href: "/itihas", title: "ঐতিহাসিক সময়রেখা", text: "সিন্ধু সভ্যতা থেকে আধুনিক যুগ — গবেষণাভিত্তিক ইতিহাস।", icon: "🏛️" },
];

export default function Home() {
  return (
    <>
      <section className="om-bg border-b border-border">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-[1.4fr_1fr] md:py-24">
          <div>
            <p className="font-semibold text-saffron">সনাতন ধর্ম · চতুর্যুগ · দশাবতার</p>
            <h1 className="mt-2 font-serif text-4xl font-extrabold leading-tight text-maroon md:text-6xl">
              হিন্দু ধর্মের ইতিহাস ও চার যুগের কাহিনি
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted">
              সত্য, ত্রেতা, দ্বাপর ও কলি — প্রতিটি যুগে কী ঘটেছিল, কারা ছিলেন, কোন অবতার এসেছিলেন,
              মানুষের আয়ু ও ধর্ম কেমন ছিল — সব কিছু এক জায়গায়, সহজ বাংলায়।
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/yuga" className="rounded-full bg-saffron px-6 py-3 font-semibold text-white shadow hover:opacity-90">
                চার যুগ জানুন
              </Link>
              <Link href="/itihas" className="rounded-full border border-border bg-card px-6 py-3 font-semibold hover:border-saffron">
                ঐতিহাসিক সময়রেখা
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative flex h-64 w-64 items-center justify-center rounded-full border-4 border-saffron/40 md:h-80 md:w-80">
              <div className="absolute inset-4 rounded-full border-2 border-dashed border-maroon/30" />
              <span className="font-serif text-[8rem] leading-none text-saffron md:text-[10rem]">ॐ</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="font-serif text-3xl font-bold">চতুর্যুগ — এক মহাযুগের চার ভাগ</h2>
        <p className="mt-3 max-w-3xl text-muted">
          হিন্দু শাস্ত্রে সময় সরলরেখা নয়, চক্রাকার। চার যুগ মিলে এক মহাযুগ (চতুর্যুগ) — মোট{" "}
          <strong className="text-foreground">৪৩,২০,০০০ বছর</strong>। যুগগুলোর দৈর্ঘ্যের অনুপাত ৪ : ৩ : ২ : ১,
          আর প্রতি যুগে ধর্মের এক পা করে কমে যায়।
        </p>

        <div className="mt-8 flex h-6 overflow-hidden rounded-full text-xs font-semibold text-white">
          {yugas.map((y) => (
            <div
              key={y.slug}
              className={`flex items-center justify-center bg-gradient-to-r ${y.accent}`}
              style={{ flex: y.divineYears.main }}
            >
              {y.name}
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {yugas.map((y) => (
            <YugaCard key={y.slug} yuga={y} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4">
        <KaliCounter />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="font-serif text-3xl font-bold">আরও জানুন</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((s) => (
            <Link key={s.href} href={s.href} className="rounded-2xl border border-border bg-card p-6 transition hover:border-saffron hover:shadow-md">
              <span className="text-3xl">{s.icon}</span>
              <h3 className="mt-3 font-serif text-xl font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted">{s.text}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4">
        <div className="rounded-2xl border border-border bg-card p-6 md:p-10">
          <h2 className="font-serif text-2xl font-bold">দশাবতার এক নজরে</h2>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
            {avatars.map((a) => (
              <Link key={a.slug} href={`/avatar#${a.slug}`} className="rounded-xl border border-border p-3 text-center hover:border-saffron">
                <div className="text-3xl">{a.symbol}</div>
                <div className="mt-1 font-semibold">{bn(a.number)}. {a.name}</div>
                <div className="text-xs text-muted">{a.yuga}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="font-serif text-2xl leading-relaxed text-maroon">
          যদা যদা হি ধর্মস্য গ্লানির্ভবতি ভারত।<br />
          অভ্যুত্থানমধর্মস্য তদাত্মানং সৃজাম্যহম্॥
        </p>
        <p className="mt-4 text-muted">
          “হে ভারত, যখনই ধর্মের গ্লানি ও অধর্মের অভ্যুত্থান হয়, তখনই আমি নিজেকে প্রকাশ করি।” — শ্রীমদ্ভগবদ্গীতা ৪.৭
        </p>
      </section>
    </>
  );
}
