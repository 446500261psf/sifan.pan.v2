import { useEffect, useState } from 'react'
import { publicUrl } from '../publicUrl'

const INTERVAL_MS = 4_000
const FADE_MS = 900

type Props = {
  slides: string[]
  alt: string
  rev?: string
}

function slideUrl(file: string, rev?: string) {
  const url = publicUrl(file)
  return rev ? `${url}?v=${encodeURIComponent(rev)}` : url
}

export function AutoCycleMockup({ slides, alt, rev }: Props) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (slides.length < 2) return

    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length)
    }, INTERVAL_MS)

    return () => window.clearInterval(id)
  }, [slides.length])

  return (
    <div className="iphone-mockup">
      <div className="iphone-mockup-bezel">
        <div className="iphone-mockup-island" />
        <div className="iphone-mockup-screen auto-cycle-screen">
          {slides.map((file, i) => (
            <img
              key={file}
              className={`auto-cycle__img${i === index ? ' auto-cycle__img--active' : ''}`}
              src={slideUrl(file, rev)}
              alt={i === index ? alt : ''}
              draggable={false}
              style={{ transitionDuration: `${FADE_MS}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
