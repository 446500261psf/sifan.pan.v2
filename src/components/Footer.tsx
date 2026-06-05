export function Footer() {
  return (
    <footer id="contact" className="border-t border-black/5 bg-white px-5 py-12 sm:px-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-ink">Sifan Pan</p>
          <p className="mt-1 text-sm text-ink-muted">Product Designer · sifan.pan.v2</p>
        </div>
        <p className="text-sm text-ink-muted">
          <a href="mailto:hello@example.com" className="underline-offset-4 hover:underline">
            Email
          </a>
          {' · '}
          <a
            href="https://github.com/446500261psf"
            className="underline-offset-4 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </p>
      </div>
    </footer>
  )
}
