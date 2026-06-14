import { useState } from 'react'
import type { WorkProfile, WorkProject, WorkScreen } from '../data/workShowcase'
import { publicUrl } from '../publicUrl'
import { PopupMotionMockup } from './PopupMotionMockup'
import { AutoCycleMockup } from './AutoCycleMockup'
import { IphoneMockup } from './IphoneMockup'
import { AngledPhoneMockup } from './AngledPhoneMockup'
import { HandPhoneMockup } from './HandPhoneMockup'
import { MacBookMockup } from './MacBookMockup'
import { WorkExposurePanel } from './WorkExposurePanel'
import { WorkBentoPanel } from './WorkBentoPanel'
import { WidescreenMockup } from './WidescreenMockup'

function WorkScreenMockup({ screen, index }: { screen: WorkScreen; index: number }) {
  if (screen.kind === 'empty') {
    return <IphoneMockup key={`empty-${index}`} empty alt={screen.alt} />
  }

  if (screen.kind === 'popup-motion' && screen.base && screen.popup) {
    return (
      <PopupMotionMockup
        key={`popup-${index}`}
        base={screen.base}
        popup={screen.popup}
        popupHeightRatio={screen.popupHeightRatio ?? 0.5}
        alt={screen.alt}
        rev={screen.rev}
        delay={index * 0.35}
      />
    )
  }

  if (screen.kind === 'auto-cycle' && screen.slides) {
    return (
      <AutoCycleMockup
        key={`auto-cycle-${index}`}
        slides={screen.slides}
        alt={screen.alt}
        rev={screen.rev}
      />
    )
  }

  return (
    <IphoneMockup
      key={`${screen.file}-${screen.rev ?? ''}-${index}`}
      src={screen.file!}
      alt={screen.alt}
      rev={screen.rev}
    />
  )
}

type ProfileProps = {
  profile: WorkProfile
}

export function WorkProfileHeader({ profile }: ProfileProps) {
  return (
    <header className="work-showcase-meta work-profile-header">
      <img
        className="work-showcase-logo"
        src={publicUrl(profile.logo)}
        alt=""
        width={32}
        height={32}
      />
      <div>
        <p className="work-showcase-role">{profile.role}</p>
        <p className="work-showcase-period">{profile.period}</p>
      </div>
    </header>
  )
}

type ProjectProps = {
  project: WorkProject
}

export function WorkShowcase({ project }: ProjectProps) {
  const groupedClass = project.groupId ? ' work-showcase-grouped' : ''
  const screens = project.screens ?? []
  const isDeviceMockup =
    project.mockupLayout === 'widescreen' ||
    project.mockupLayout === 'macbook' ||
    project.mockupLayout === 'angled-phone' ||
    project.mockupLayout === 'hand-phone'
  const isCampaignScroll =
    isDeviceMockup &&
    screens.length > 0 &&
    screens.every((s) => s.scroll)
  const isHandPhoneSplit = project.mockupLayout === 'hand-phone'
  const isBentoLayout = project.mockupLayout === 'bento'
  const isHandPhoneVideoTabs =
    isHandPhoneSplit &&
    screens.length > 1 &&
    screens.every((s) => s.kind === 'video')
  const [activeCampaign, setActiveCampaign] = useState(0)
  const activeScreen =
    isCampaignScroll || isHandPhoneVideoTabs
      ? (screens[activeCampaign] ?? screens[0])
      : screens[0]
  const bodyText =
    isHandPhoneVideoTabs && activeScreen?.description
      ? activeScreen.description
      : project.description

  const isSplitPanel =
    project.panelLayout === 'split' && !isDeviceMockup && !project.mockupLayout

  const isExposurePanel = project.panelLayout === 'exposure'

  const handPhoneVideoTabs =
    isHandPhoneVideoTabs ? (
      <div
        className="hand-phone-video-tabs"
        role="tablist"
        aria-label={`${project.title} videos`}
      >
        {screens.map((screen, index) => (
          <button
            key={`${screen.file ?? index}-${index}`}
            type="button"
            role="tab"
            className={`hand-phone-video-tab${index === activeCampaign ? ' hand-phone-video-tab--active' : ''}`}
            aria-selected={index === activeCampaign}
            aria-controls={`${project.id}-hand-phone-panel`}
            onClick={() => setActiveCampaign(index)}
          >
            <span className="hand-phone-video-tab-arrow" aria-hidden>
              →
            </span>
            {screen.label ?? screen.alt}
          </button>
        ))}
      </div>
    ) : null

  const campaignTabs =
    isCampaignScroll && screens.length > 1 ? (
      <div
        className="campaign-scroll-tabs"
        role="tablist"
        aria-label={`${project.title} campaigns`}
      >
        {screens.map((screen, index) => (
          <button
            key={`${screen.file ?? index}-${index}`}
            type="button"
            role="tab"
            className={`campaign-scroll-tab${index === activeCampaign ? ' campaign-scroll-tab--active' : ''}`}
            style={{ backgroundColor: screen.themeColor ?? '#5c5c5c' }}
            aria-label={screen.label ?? screen.alt ?? `Campaign ${index + 1}`}
            aria-selected={index === activeCampaign}
            aria-controls={`${project.id}-campaign-panel`}
            onClick={() => setActiveCampaign(index)}
          />
        ))}
      </div>
    ) : null

  return (
    <article
      className={`work-showcase${groupedClass}${project.hideTitle ? ' work-showcase-nested' : ''}${project.panelLayout === 'exposure' ? ' work-showcase--exposure' : ''}${isBentoLayout ? ' work-showcase--bento' : ''}`}
      aria-labelledby={`${project.id}-title`}
    >
      <div className="work-showcase-stage">
        <div className="work-showcase-content">
          {!project.hideTitle && !isSplitPanel && !isExposurePanel && !isHandPhoneSplit ? (
            <div className="work-showcase-intro">
              <h2 id={`${project.id}-title`} className="work-showcase-title">
                {project.title}
              </h2>
            </div>
          ) : null}

          <div
            className={`work-showcase-panel${isSplitPanel ? ' work-showcase-panel--split' : ''}${isExposurePanel ? ' work-showcase-panel--exposure' : ''}${isHandPhoneSplit ? ' work-showcase-panel--hand-phone' : ''}${isBentoLayout ? ' work-showcase-panel--bento' : ''}`}
          >
            {isExposurePanel ? (
              <WorkExposurePanel project={project} />
            ) : isSplitPanel ? (
              <div className="work-showcase-split">
                <div className="work-showcase-phones">
                  {screens.map((screen, index) => (
                    <WorkScreenMockup key={`row1-${index}`} screen={screen} index={index} />
                  ))}
                  {project.screensRow2?.map((screen, index) => (
                    <WorkScreenMockup key={`row2-${index}`} screen={screen} index={index} />
                  ))}
                </div>
                <div className="work-showcase-split-copy">
                  <h2 id={`${project.id}-title`} className="work-showcase-title">
                    {project.title}
                  </h2>
                  {bodyText ? <p className="work-showcase-desc">{bodyText}</p> : null}
                </div>
              </div>
            ) : project.mockupLayout === 'angled-phone' ? (
              <div className="work-showcase-angled-phone">
                <AngledPhoneMockup
                  key={`${activeScreen?.file ?? 'empty'}-${activeScreen?.rev ?? ''}`}
                  src={activeScreen?.file}
                  alt={activeScreen?.alt ?? project.title}
                  rev={activeScreen?.rev}
                  scroll={activeScreen?.scroll}
                />
              </div>
            ) : project.mockupLayout === 'macbook' ? (
              <div className="work-showcase-macbook">
                <MacBookMockup
                  key={`${activeScreen?.file ?? 'empty'}-${activeScreen?.rev ?? ''}`}
                  src={activeScreen?.file}
                  alt={activeScreen?.alt ?? project.title}
                  rev={activeScreen?.rev}
                  scroll={activeScreen?.scroll}
                  pageUrl={activeScreen?.pageUrl}
                />
              </div>
            ) : project.mockupLayout === 'hand-phone' ? (
              <div className="work-showcase-hand-phone-layout">
                {handPhoneVideoTabs}
                <div className="work-showcase-hand-phone-copy">
                  {!project.hideTitle ? (
                    <h2 id={`${project.id}-title`} className="work-showcase-title">
                      {project.title}
                    </h2>
                  ) : null}
                  {bodyText ? (
                    <p
                      id={isHandPhoneVideoTabs ? `${project.id}-hand-phone-panel` : undefined}
                      className="work-showcase-desc"
                      role={isHandPhoneVideoTabs ? 'tabpanel' : undefined}
                    >
                      {bodyText}
                    </p>
                  ) : null}
                  {campaignTabs}
                </div>
                <div className="work-showcase-hand-phone">
                  <HandPhoneMockup
                    key={`${activeScreen?.file ?? 'empty'}-${activeScreen?.rev ?? ''}`}
                    src={activeScreen?.file}
                    alt={activeScreen?.alt ?? project.title}
                    rev={activeScreen?.rev}
                    scroll={activeScreen?.scroll}
                  />
                </div>
              </div>
            ) : project.mockupLayout === 'widescreen' ? (
              <div className="work-showcase-widescreen">
                <WidescreenMockup
                  key={`${activeScreen?.file ?? 'empty'}-${activeScreen?.rev ?? ''}`}
                  src={activeScreen?.file}
                  alt={activeScreen?.alt ?? project.title}
                  rev={activeScreen?.rev}
                  scroll={activeScreen?.scroll}
                />
              </div>
            ) : project.mockupLayout === 'bento' && project.bentoItems?.length ? (
              <WorkBentoPanel
                items={project.bentoItems}
                frame={project.bentoFrame}
              />
            ) : (
              <div className="work-showcase-phones">
                {screens.map((screen, index) => (
                  <WorkScreenMockup key={`row1-${index}`} screen={screen} index={index} />
                ))}
                {project.screensRow2?.map((screen, index) => (
                  <WorkScreenMockup key={`row2-${index}`} screen={screen} index={index} />
                ))}
              </div>
            )}

            {project.subtitle ? (
              <h3
                id={project.hideTitle ? `${project.id}-title` : undefined}
                className="work-showcase-subtitle"
              >
                {project.subtitle}
              </h3>
            ) : null}

            {isCampaignScroll && !isHandPhoneSplit && screens.length > 1 ? campaignTabs : null}

            {!isSplitPanel && !isExposurePanel && !isHandPhoneSplit && bodyText ? (
              <p
                id={isCampaignScroll ? `${project.id}-campaign-panel` : undefined}
                className="work-showcase-desc"
                role={isCampaignScroll ? 'tabpanel' : undefined}
              >
                {bodyText}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  )
}
