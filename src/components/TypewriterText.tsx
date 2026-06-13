import { useEffect, useState, type CSSProperties } from 'react'

const CHAR_MS = 96
const SPACE_MS = 72
const PAUSE_BETWEEN_LINES_MS = 760

export type TypewriterSegment = {
  text: string
  /** 开始本段前的停顿（如 you 后的 2 秒） */
  pauseBefore?: number
  /** 接在上一行末尾，不换行（如 :)） */
  joinPrevious?: boolean
}

type TypingEvent =
  | { kind: 'char'; value: string }
  | { kind: 'pause'; ms: number }
  | { kind: 'break' }

type Props = {
  segments: TypewriterSegment[]
  className?: string
  onComplete?: () => void
  /** 背景变黑时保留、不隐去的文字 */
  keepText?: string
  /** 第一行中 keepText 之前的固定前缀（避免打字时 DOM 突变） */
  keepPrefix?: string
  hideCursor?: boolean
  /** 拉开 → 两侧渐隐 */
  pullKeep?: boolean
}

function renderKeepText(keep: string, keepText: string, pullKeep: boolean) {
  const isComplete = keep.length >= keepText.length
  const pulling = pullKeep && isComplete

  if (!isComplete) {
    return <span className="typewriter-keep">{keep}</span>
  }

  return (
    <span className={`typewriter-keep${pulling ? ' typewriter-keep-pull-fade' : ''}`}>
      {keepText.split('').map((ch, i) => (
        <span
          key={`${ch}-${i}`}
          className="typewriter-keep-char"
          style={{ '--char-i': i } as CSSProperties}
        >
          {ch}
        </span>
      ))}
    </span>
  )
}

function renderLineContent(
  line: string,
  lineIndex: number,
  keepText: string | undefined,
  keepPrefix: string | undefined,
  pullKeep: boolean,
) {
  if (!keepText) {
    return <span className="typewriter-text">{line}</span>
  }

  if (lineIndex === 0 && keepPrefix) {
    const before = line.slice(0, Math.min(line.length, keepPrefix.length))
    const rest = line.slice(keepPrefix.length)
    const keep = rest.slice(0, Math.min(rest.length, keepText.length))
    const after = rest.slice(keepText.length)

    return (
      <span className="typewriter-keep-wrap">
        {before ? (
          <span className="typewriter-fade-out typewriter-fade-prefix">{before}</span>
        ) : null}
        {renderKeepText(keep, keepText, pullKeep)}
        {after ? <span className="typewriter-fade-out">{after}</span> : null}
      </span>
    )
  }

  if (lineIndex > 0) {
    return <span className="typewriter-fade-out">{line}</span>
  }

  return <span className="typewriter-text">{line}</span>
}

function charDelay(ch: string): number {
  if (ch === ' ') return SPACE_MS
  return CHAR_MS
}

function buildEvents(segments: TypewriterSegment[]): TypingEvent[] {
  const events: TypingEvent[] = []

  segments.forEach((seg, i) => {
    if (i > 0 && !seg.joinPrevious) {
      events.push({ kind: 'pause', ms: PAUSE_BETWEEN_LINES_MS })
      events.push({ kind: 'break' })
    }

    if (seg.pauseBefore) {
      events.push({ kind: 'pause', ms: seg.pauseBefore })
    }

    for (const ch of seg.text) {
      events.push({ kind: 'char', value: ch })
    }
  })

  return events
}

function rowsFromEvents(events: TypingEvent[], count: number): string[] {
  const rows = ['']

  for (const event of events.slice(0, count)) {
    if (event.kind === 'char') {
      rows[rows.length - 1] += event.value
    } else if (event.kind === 'break') {
      rows.push('')
    }
  }

  return rows
}

function fullRows(segments: TypewriterSegment[]): string[] {
  return rowsFromEvents(buildEvents(segments), Number.MAX_SAFE_INTEGER)
}

export function TypewriterText({
  segments,
  className = '',
  onComplete,
  keepText,
  keepPrefix,
  hideCursor = false,
  pullKeep = false,
}: Props) {
  const [rows, setRows] = useState<string[]>([''])
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) {
      setRows(fullRows(segments))
      onComplete?.()
      return
    }

    const events = buildEvents(segments)
    let eventIdx = 0
    let timeoutId = 0

    const step = () => {
      if (eventIdx >= events.length) {
        onComplete?.()
        return
      }

      const event = events[eventIdx]
      eventIdx += 1
      setRows(rowsFromEvents(events, eventIdx))

      if (eventIdx >= events.length) {
        onComplete?.()
        return
      }

      let delay = 0
      if (event.kind === 'pause') delay = event.ms
      else if (event.kind === 'char') delay = charDelay(event.value)

      timeoutId = window.setTimeout(step, delay)
    }

    timeoutId = window.setTimeout(step, 0)

    return () => window.clearTimeout(timeoutId)
  }, [segments, onComplete])

  useEffect(() => {
    const id = window.setInterval(() => setShowCursor((v) => !v), 530)
    return () => window.clearInterval(id)
  }, [])

  const lastRowIndex = rows.length - 1

  return (
    <div className={`typewriter-block ${className}`.trim()}>
      {rows.map((line, i) => (
        <p
          key={i}
          className={`typewriter-line${keepText && i === 0 ? ' typewriter-line-keep' : ''}`}
        >
          {renderLineContent(line, i, keepText, keepPrefix, pullKeep)}
          {i === lastRowIndex && !hideCursor && (
            <span
              className={`typewriter-cursor${showCursor ? ' typewriter-cursor-visible' : ''}`}
              aria-hidden
            >
              |
            </span>
          )}
        </p>
      ))}
    </div>
  )
}
