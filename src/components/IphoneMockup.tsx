import { useState } from 'react'
import { publicUrl } from '../publicUrl'

type Props = {
  src?: string
  alt: string
  rev?: string
  empty?: boolean
}

function isVideoSrc(src: string): boolean {
  return /\.(mov|mp4|webm)$/i.test(src)
}

export function IphoneMockup({ src, alt, rev, empty }: Props) {
  const [missing, setMissing] = useState(false)

  if (empty || !src) {
    return (
      <div className="iphone-mockup" aria-hidden>
        <div className="iphone-mockup-bezel">
          <div className="iphone-mockup-island" />
          <div className="iphone-mockup-screen">
            <div className="iphone-mockup-placeholder iphone-mockup-placeholder--empty" />
          </div>
        </div>
      </div>
    )
  }

  const url = rev ? `${publicUrl(src)}?v=${encodeURIComponent(rev)}` : publicUrl(src)
  const isVideo = isVideoSrc(src)

  return (
    <div className="iphone-mockup" aria-hidden={missing}>
      <div className="iphone-mockup-bezel">
        <div className="iphone-mockup-island" />
        <div className="iphone-mockup-screen">
          {missing ? (
            <div className="iphone-mockup-placeholder">
              <span>{src.split('/').pop()}</span>
            </div>
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
  )
}
