export function Hero() {
  return (
    <section className="relative overflow-hidden px-5 pb-16 pt-20 sm:px-8 sm:pb-24 sm:pt-28">
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/15 blur-3xl"
        aria-hidden
      />
      <div className="relative mx-auto max-w-5xl">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
          Product Design Portfolio
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-6xl">
          Designing for growth, conversion, and clarity in AI-era products.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
          I&apos;m Sifan Pan — a product designer focused on monetization, engagement, and
          education experiences inside consumer and health-tech apps.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="#projects"
            className="inline-flex items-center rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            View projects
          </a>
          <a
            href="#contact"
            className="inline-flex items-center rounded-full border border-black/10 bg-white px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-black/20"
          >
            Get in touch
          </a>
        </div>
      </div>
    </section>
  )
}
