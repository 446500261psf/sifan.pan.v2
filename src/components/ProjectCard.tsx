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
      className="open-card group flex flex-col p-6 transition-shadow duration-[var(--open-duration)] hover:shadow-md sm:p-8"
    >
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-sm font-medium tabular-nums text-accent">{project.index}</span>
        <span className="text-xs uppercase tracking-wider text-ink-muted">{project.label}</span>
      </div>
      <h3 className="mt-4 text-xl font-semibold tracking-tight text-ink group-hover:text-accent sm:text-2xl">
        {project.title}
      </h3>
      <p className="open-desc mt-3 flex-1 text-sm leading-relaxed text-ink sm:text-base">
        {project.summary}
      </p>
      <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tags">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-ink-muted"
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
