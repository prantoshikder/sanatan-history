export default function PageHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="om-bg border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        {eyebrow && <p className="text-sm font-semibold text-saffron">{eyebrow}</p>}
        <h1 className="mt-1 font-serif text-3xl font-extrabold text-maroon md:text-5xl">{title}</h1>
        {children && <div className="mt-4 max-w-3xl text-lg text-muted">{children}</div>}
      </div>
    </section>
  );
}
