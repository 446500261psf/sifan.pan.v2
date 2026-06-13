type Props = {
  eyebrow: string
  title: string
  subtitle?: string
}

export function SectionHeading({ eyebrow, title, subtitle }: Props) {
  const headingId = `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-heading`

  return (
    <header>
      <p className="open-section-label">{eyebrow}</p>
      <h2
        id={headingId}
        className="open-display mt-4 text-3xl text-ink sm:text-4xl lg:text-[2.75rem]"
      >
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
          {subtitle}
        </p>
      ) : null}
    </header>
  )
}
