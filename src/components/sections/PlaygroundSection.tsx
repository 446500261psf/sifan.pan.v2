import { PlaygroundCard } from '../PlaygroundCard'
import { SectionHeading } from '../SectionHeading'
import { playgroundItems } from '../../data/playground'

type Props = {
  cardLayout?: boolean
}

export function PlaygroundSection({ cardLayout = false }: Props) {
  const isEmpty = playgroundItems.length === 0

  return (
    <section
      aria-labelledby="playground-heading"
      id="playground"
      className={
        cardLayout
          ? 'scroll-mt-24'
          : 'border-b border-white/5 px-5 py-16 sm:px-8 sm:py-24'
      }
    >
      <div className={cardLayout ? undefined : 'mx-auto max-w-5xl'}>
        {!cardLayout && (
          <SectionHeading
            eyebrow="01 — Playground"
            title="Playground"
            subtitle="Design experiments — each tile sizes itself from its cover."
          />
        )}
        {isEmpty ? (
          <p className={`pg-empty${cardLayout ? '' : ' mt-10'}`}>Coming soon.</p>
        ) : (
          <div className={`pg-grid${cardLayout ? '' : ' mt-10'}`}>
            {playgroundItems.map((item) => (
              <PlaygroundCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
