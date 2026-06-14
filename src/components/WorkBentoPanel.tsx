import { useCallback, useEffect, useMemo, useState, type CSSProperties } from 'react'

function useMobileBentoStack() {
  const [stacked, setStacked] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(max-width: 767px)').matches
      : false,
  )

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const onChange = () => setStacked(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return stacked
}
import { createPortal } from 'react-dom'
import type { WorkBentoFrame, WorkBentoItem } from '../data/workShowcase'
import { publicUrl } from '../publicUrl'
import { IphoneMockup } from './IphoneMockup'

type Props = {
  items: WorkBentoItem[]
  frame?: WorkBentoFrame
}

function columnSpan(aspectRatio: number): number {
  if (aspectRatio >= 2.5) return 12
  if (aspectRatio >= 1.85) return 8
  if (aspectRatio >= 1.35) return 6
  return 4
}

function tileSpans(aspectRatio: number): { col: number; row: number } {
  return {
    col: columnSpan(aspectRatio),
    row: aspectRatio < 0.95 ? 2 : 1,
  }
}

function frameTileStyle(
  rect: NonNullable<WorkBentoItem['frame']>,
  frame: WorkBentoFrame,
  zIndex?: number,
): CSSProperties {
  return {
    left: `${(rect.x / frame.width) * 100}%`,
    top: `${(rect.y / frame.height) * 100}%`,
    width: `${(rect.width / frame.width) * 100}%`,
    height: `${(rect.height / frame.height) * 100}%`,
    zIndex: zIndex ?? 1,
  }
}

function tileStyle(
  item: WorkBentoItem,
  aspectRatio: number,
  frame?: WorkBentoFrame,
  stackOnMobile = false,
): CSSProperties {
  const base: CSSProperties = {
    ['--tile-ar' as string]: String(aspectRatio),
  }

  if (item.frame && frame && !stackOnMobile) {
    return {
      ...base,
      ...frameTileStyle(item.frame, frame, item.zIndex),
    }
  }

  if (item.placement) {
    const { colStart, colSpan, rowStart, rowSpan } = item.placement
    return {
      ...base,
      gridColumn: `${colStart} / span ${colSpan}`,
      gridRow: `${rowStart} / span ${rowSpan}`,
    }
  }

  const { col, row } = tileSpans(aspectRatio)
  return {
    ...base,
    gridColumn: `span ${col}`,
    gridRow: `span ${row}`,
  }
}

type TileProps = {
  item: WorkBentoItem
  active: boolean
  frame?: WorkBentoFrame
  stackOnMobile: boolean
  onSelect: (id: string) => void
}

function BentoTile({ item, active, frame, stackOnMobile, onSelect }: TileProps) {
  const [aspectRatio, setAspectRatio] = useState(item.aspectRatio ?? 1.75)
  const hasLongImage = Boolean(item.longImage)
  const isFramed = Boolean(item.frame && frame && !stackOnMobile)
  const isPlaced = Boolean(item.placement)

  const style = useMemo(
    () => tileStyle(item, aspectRatio, frame, stackOnMobile),
    [item, aspectRatio, frame, stackOnMobile],
  )

  const bannerUrl = item.rev
    ? `${publicUrl(item.banner)}?v=${encodeURIComponent(item.rev)}`
    : publicUrl(item.banner)

  return (
    <button
      type="button"
      className={`work-bento-tile${isFramed ? ' work-bento-tile--framed' : ''}${isPlaced ? ' work-bento-tile--placed' : ''}${active ? ' work-bento-tile--active' : ''}${hasLongImage ? '' : ' work-bento-tile--static'}`}
      style={style}
      aria-pressed={hasLongImage ? active : undefined}
      aria-label={item.alt}
      disabled={!hasLongImage}
      onClick={() => hasLongImage && onSelect(item.id)}
    >
      <img
        className="work-bento-tile-cover"
        src={bannerUrl}
        alt=""
        loading="lazy"
        decoding="async"
        style={item.objectPosition ? { objectPosition: item.objectPosition } : undefined}
        onLoad={(event) => {
          const { naturalWidth, naturalHeight } = event.currentTarget
          if (naturalWidth > 0 && naturalHeight > 0) {
            setAspectRatio(naturalWidth / naturalHeight)
          }
        }}
      />
    </button>
  )
}

export function WorkBentoPanel({ items, frame }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const stackOnMobile = useMobileBentoStack()
  const usesFrameLayout = Boolean(frame && items.every((item) => item.frame))
  const usesPlacedLayout = !usesFrameLayout && items.some((item) => item.placement)

  const activeItem = useMemo(
    () => items.find((item) => item.id === activeId),
    [activeId, items],
  )

  const handleSelect = useCallback((id: string) => {
    setActiveId((current) => (current === id ? null : id))
  }, [])

  const closeDetail = useCallback(() => setActiveId(null), [])

  useEffect(() => {
    if (!activeId) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeDetail()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [activeId, closeDetail])

  const gridStyle = useMemo((): CSSProperties | undefined => {
    if (!usesFrameLayout || !frame) return undefined
    return {
      ['--bento-frame-ar' as string]: String(frame.width / frame.height),
    }
  }, [frame, usesFrameLayout])

  const lightbox = activeItem?.longImage ? (
    <div
      className="work-bento-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={activeItem.alt}
      onClick={closeDetail}
    >
      <div
        className="work-bento-lightbox-inner"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="work-bento-lightbox-close"
          aria-label="Close"
          onClick={closeDetail}
        >
          ×
        </button>
        <IphoneMockup
          key={`${activeItem.id}-${activeItem.rev ?? ''}`}
          src={activeItem.longImage}
          alt={activeItem.alt}
          rev={activeItem.rev}
          scroll
          eager
        />
      </div>
    </div>
  ) : null

  return (
    <div className="work-bento">
      <div
        className={`work-bento-grid${usesFrameLayout && !stackOnMobile ? ' work-bento-grid--frame' : ''}${usesPlacedLayout ? ' work-bento-grid--placed' : ''}`}
        style={gridStyle}
      >
        {items.map((item) => (
          <BentoTile
            key={item.id}
            item={item}
            active={item.id === activeId}
            frame={frame}
            stackOnMobile={stackOnMobile}
            onSelect={handleSelect}
          />
        ))}
      </div>

      {typeof document !== 'undefined' && lightbox
        ? createPortal(lightbox, document.body)
        : null}
    </div>
  )
}
