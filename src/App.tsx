import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { ProjectCard } from './components/ProjectCard'
import { SiteHeader } from './components/SiteHeader'
import { projects } from './data/projects'

export default function App() {
  return (
    <div className="min-h-svh">
      <SiteHeader />
      <main>
        <Hero />
        <section id="projects" className="px-5 pb-20 sm:px-8 sm:pb-28">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-ink-muted">
              Selected work
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </div>
        </section>
        <section id="about" className="border-t border-black/5 bg-white px-5 py-16 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-ink-muted">About</h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
              This is the v2 portfolio shell — modular case studies, cleaner navigation, and room
              for interactive demos. Replace placeholder copy, add project images, and wire each
              card to a detail view when you&apos;re ready.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
