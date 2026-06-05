const nav = [
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
] as const

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-canvas/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5 sm:px-8">
        <a href="#" className="text-sm font-semibold tracking-tight text-ink">
          Sifan Pan
          <span className="ml-1.5 font-normal text-ink-muted">v2</span>
        </a>
        <nav className="flex items-center gap-6" aria-label="Primary">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-ink-muted transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
