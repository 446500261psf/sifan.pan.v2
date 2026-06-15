import { useRef, type MouseEvent } from 'react'
import { publicUrl } from '../../publicUrl'
import { ClaimMedalPhoneShell } from './ClaimMedalPhoneShell'
import { MedalReliefCanvas, type MedalReliefHandle } from './MedalReliefCanvas'

/** Figma 652:5 — 灰浮雕（与 #f4f4f4 背景融合） */
const RELIEF = '/playground/medal/relief-figma-652-5.png'
/** Figma 652:28 — 彩色勋章（透明底圆形） */
const MEDAL_COLOR = '/playground/medal/medal-color-figma-v2.png'
const BG_PORTRAIT = '/playground/medal/background-cycling-wild-portrait.png'

/** Figma 652:44 — 三屏并排：擦除 / 可点按钮 / 展示 */
export function ClaimMedalMockupBoard() {
  const reliefRef = useRef<MedalReliefHandle>(null)

  const onInteractiveMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    reliefRef.current?.paintHover(e.clientX, e.clientY)
  }

  return (
    <div className="pg-medal-mockup-board">
      <ClaimMedalPhoneShell
        sceneMode="interactive"
        ctaLabel="50 km in a single ride to lock the badge!"
        ctaVariant="locked"
        onSceneMouseMove={onInteractiveMouseMove}
        scene={
          <>
            <img
              className="pg-medal-static-medal pg-medal-static-medal--underlay"
              src={publicUrl(RELIEF)}
              alt=""
              draggable={false}
              aria-hidden="true"
            />
            <MedalReliefCanvas ref={reliefRef} variant="flow" phase="wipe-medal" trackUnlock={false} />
          </>
        }
      />

      <ClaimMedalPhoneShell
        sceneMode="static"
        ctaLabel="You Did It! Unlock the Badge!"
        ctaVariant="active"
        ctaInteractive
        scene={
          <img
            className="pg-medal-static-medal"
            src={publicUrl(RELIEF)}
            alt=""
            draggable={false}
            aria-hidden="true"
          />
        }
      />

      <ClaimMedalPhoneShell
        sceneMode="showcase"
        ctaLabel="Share"
        ctaVariant="share"
        scene={
          <>
            <div className="pg-medal-showcase-bg" aria-hidden="true">
              <img src={publicUrl(BG_PORTRAIT)} alt="" draggable={false} />
            </div>
            <img
              className="pg-medal-showcase-medal"
              src={publicUrl(MEDAL_COLOR)}
              alt=""
              draggable={false}
              aria-hidden="true"
            />
          </>
        }
      />
    </div>
  )
}
