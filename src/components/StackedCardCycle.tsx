import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { publicUrl } from '../publicUrl'

const ANIM_MS = 600

type Slide = {
  file: string
  alt: string
}

type Props = {
  slides: Slide[]
  rev?: string
}

type Positions = [number, number, number]

function slideUrl(file: string, rev?: string) {
  const url = publicUrl(file)
  return rev ? `${url}?v=${encodeURIComponent(rev)}` : url
}

function rotatePositions(positions: Positions): Positions {
  return [positions[1], positions[2], positions[0]]
}

export function StackedCardCycle({ slides, rev }: Props) {
  const slideKey = useMemo(() => slides.map((slide) => slide.file).join('|'), [slides])

  const [positions, setPositions] = useState<Positions>(() =>
    slides.map((_, index) => index) as Positions,
  )
  const [animating, setAnimating] = useState(false)
  const [exitCloneSlide, setExitCloneSlide] = useState<number | null>(null)
  const [snappedSlide, setSnappedSlide] = useState<number | null>(null)
  const animatingRef = useRef(false)
  const timersRef = useRef<number[]>([])

  useEffect(() => {
    setPositions(slides.map((_, index) => index) as Positions)
    setAnimating(false)
    setExitCloneSlide(null)
    setSnappedSlide(null)
    animatingRef.current = false
  }, [slideKey, slides.length])

  useEffect(() => {
    return () => {
      timersRef.current.forEach((id) => window.clearTimeout(id))
    }
  }, [])

  const queueTimer = useCallback((fn: () => void, delay: number) => {
    const id = window.setTimeout(fn, delay)
    timersRef.current.push(id)
  }, [])

  const handleAdvance = useCallback(() => {
    if (slides.length < 2 || animatingRef.current) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) {
      setPositions((current) => rotatePositions(current))
      return
    }

    const frontSlide = positions[0]
    animatingRef.current = true
    setAnimating(true)
    setExitCloneSlide(frontSlide)
    setSnappedSlide(frontSlide)
    setPositions((current) => rotatePositions(current))

    queueTimer(() => {
      animatingRef.current = false
      setAnimating(false)
      setExitCloneSlide(null)
      setSnappedSlide(null)
    }, ANIM_MS)
  }, [positions, queueTimer, slides.length])

  if (slides.length === 0) return null

  const interactive = slides.length >= 2
  const frontSlide = positions[0]

  return (
    <div
      className={`stacked-card-cycle${interactive ? ' stacked-card-cycle--interactive' : ''}${
        animating ? ' stacked-card-cycle--animating' : ''
      }`}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={
        interactive
          ? 'Sleep module screens — click to show the next screen'
          : 'Sleep module screens'
      }
      onClick={interactive ? handleAdvance : undefined}
      onKeyDown={
        interactive
          ? (event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                handleAdvance()
              }
            }
          : undefined
      }
    >
      {slides.map((slide, slideIndex) => {
        const stackPosition = positions.indexOf(slideIndex) as 0 | 1 | 2
        const isFront = slideIndex === frontSlide
        const isSnapped = snappedSlide === slideIndex

        return (
          <div
            key={slide.file}
            className={[
              'stacked-card-cycle-card',
              `stacked-card-cycle-card--${stackPosition}`,
              isSnapped ? 'stacked-card-cycle-card--snap' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            aria-hidden={!isFront}
          >
            <img
              src={slideUrl(slide.file, rev)}
              alt={isFront ? slide.alt : ''}
              draggable={false}
              loading={slideIndex === 0 ? 'eager' : 'lazy'}
            />
          </div>
        )
      })}

      {exitCloneSlide !== null ? (
        <div
          className="stacked-card-cycle-card stacked-card-cycle-card--0 stacked-card-cycle-card--exit-clone"
          aria-hidden
        >
          <img
            src={slideUrl(slides[exitCloneSlide]!.file, rev)}
            alt=""
            draggable={false}
          />
        </div>
      ) : null}
    </div>
  )
}
