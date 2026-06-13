import { useCallback, useEffect, useRef, useState } from 'react'
import { publicUrl } from '../publicUrl'

const MOCKUP_OVERLAY = 'portfolio/project-5/hand-phone-scroll/Background.png'
const PHONE_SLOT = {
  top: 1.5,
  left: 10.23,
  width: 42.02,
} as const
const SCREEN_INSET = {
  top: 18,
  left: 9.92,
  right: 24.68,
  bottom: 12.97,
} as const
const MOCKUP_REV = '20250613'

type Props = {
  src?: string
  alt: string
  rev?: string
  scroll?: boolean
}

function isVideoSrc(src: string): boolean {
  return /\.(mov|mp4|webm)$/i.test(src)
}

export function HandPhoneMockup({ src, alt, rev, scroll }: Props) {
  const [missing, setMissing] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  const updateScrollProgress = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const max = el.scrollHeight - el.clientHeight
    setScrollProgress(max > 0 ? el.scrollTop / max : 0)
  }, [])

  useEffect(() => {
    setMissing(false)
    setScrollProgress(0)
    scrollRef.current?.scrollTo({ top: 0 })
  }, [src, rev])

  const url = src
    ? rev
      ? `${publicUrl(src)}?v=${encodeURIComponent(rev)}`
      : publicUrl(src)
    : undefined
  const isVideo = src ? isVideoSrc(src) : false
  const overlaySrc = `${publicUrl(MOCKUP_OVERLAY)}?v=${MOCKUP_REV}`

  return (
    <div className="hand-phone-mockup">
      <div className="hand-phone-mockup-device">
        <img
          className="hand-phone-mockup-base"
          src={overlaySrc}
          alt=""
          aria-hidden
          draggable={false}
        />

        <div className="hand-phone-mockup-layers" aria-hidden={missing && !!src}>
          <div
            className="hand-phone-mockup-slot"
            style={{
              top: `${PHONE_SLOT.top}%`,
              left: `${PHONE_SLOT.left}%`,
              width: `${PHONE_SLOT.width}%`,
            }}
          >
            <div
              className={`hand-phone-mockup-screen${scroll ? ' hand-phone-mockup-screen--scroll' : ''}`}
              style={{
                top: `${SCREEN_INSET.top}%`,
                right: `${SCREEN_INSET.right}%`,
                bottom: `${SCREEN_INSET.bottom}%`,
                left: `${SCREEN_INSET.left}%`,
              }}
            >
              {!src ? null : missing ? (
                <div className="hand-phone-mockup-placeholder">
                  <span>{src.split('/').pop()}</span>
                </div>
              ) : scroll ? (
                <>
                  <div
                    ref={scrollRef}
                    className="hand-phone-mockup-scroll"
                    onScroll={updateScrollProgress}
                  >
                    <img
                      src={url}
                      alt={alt}
                      loading="lazy"
                      onLoad={updateScrollProgress}
                      onError={() => setMissing(true)}
                    />
                  </div>
                  <div className="hand-phone-mockup-progress" aria-hidden>
                    <div
                      className="hand-phone-mockup-progress-fill"
                      style={{ transform: `scaleY(${scrollProgress})` }}
                    />
                  </div>
                </>
              ) : isVideo ? (
                <video
                  src={url}
                  autoPlay
                  loop
                  muted
                  playsInline
                  aria-label={alt}
                  onError={() => setMissing(true)}
                />
              ) : (
                <img src={url} alt={alt} loading="lazy" onError={() => setMissing(true)} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
