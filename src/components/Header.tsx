import Link from "next/link";

const links = [
  { href: "/", label: "প্রথম পাতা" },
  { href: "/yuga", label: "চার যুগ" },
  { href: "/kahini", label: "কাহিনি" },
  { href: "/devdevi", label: "দেব-দেবী" },
  { href: "/kalchakra", label: "কালচক্র" },
  { href: "/avatar", label: "দশাবতার" },
  { href: "/shastra", label: "শাস্ত্র" },
  { href: "/itihas", label: "ইতিহাস" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-serif text-xl font-bold text-maroon">
          <span className="text-2xl text-saffron">ॐ</span>
          সনাতন ইতিহাস
        </Link>

        <nav className="hidden gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-1.5 text-sm font-medium hover:bg-saffron/15 hover:text-saffron"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <details className="relative md:hidden">
          <summary className="cursor-pointer list-none rounded-md border border-border px-3 py-1.5 text-sm">
            মেনু ☰
          </summary>
          <div className="absolute right-0 mt-2 flex w-44 flex-col rounded-lg border border-border bg-card p-2 shadow-lg">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="rounded px-3 py-2 text-sm hover:bg-saffron/15">
                {l.label}
              </Link>
            ))}
          </div>
        </details>
      </div>
    </header>
  );
}
