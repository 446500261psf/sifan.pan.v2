import type { Project } from '../data/projects'

type Props = {
  project: Project
}

export function ProjectCard({ project }: Props) {
  const Tag = project.href ? 'a' : 'article'
  const linkProps = project.href
    ? { href: project.href, target: '_blank' as const, rel: 'noopener noreferrer' }
    : {}

  return (
    <Tag
      {...linkProps}
      className="group flex flex-col rounded-2xl border border-black/6 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:p-8"
    >
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-sm font-medium tabular-nums text-accent">{project.index}</span>
        <span className="text-xs uppercase tracking-wider text-ink-muted">{project.label}</span>
      </div>
      <h3 className="mt-4 text-xl font-semibold tracking-tight text-ink group-hover:text-accent sm:text-2xl">
        {project.title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted sm:text-base">
        {project.summary}
      </p>
      <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tags">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full bg-canvas px-3 py-1 text-xs font-medium text-ink-muted"
          >
            {tag}
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm font-medium text-ink opacity-0 transition-opacity group-hover:opacity-100">
        Case study coming soon →
      </p>
    </Tag>
  )
}
