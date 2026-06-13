import type { CSSProperties } from 'react'
import { useState } from 'react'
import { Footer } from './Footer'
import { HeroCinematic } from './HeroCinematic'
import { HomeTabs, type HomeTab } from './HomeTabs'
import { SiteHeader } from './SiteHeader'
import { WorkProfileHeader, WorkShowcase } from './WorkShowcase'
import { workProfile, workProjects } from '../data/workShowcase'
import { AboutSection } from './sections/AboutSection'
import { PlaygroundSection } from './sections/PlaygroundSection'
import { WorksSection } from './sections/WorksSection'

type Props = {
  variant: 'typing' | 'cinematic'
  /** 页眉 sifan 逐字向下瞬移 */
  brandReveal?: boolean
  /** 字母转场后，主页内容自上而下渐现 */
  contentReveal?: boolean
}

const reveal = (order: number): CSSProperties =>
  ({ '--reveal-order': order }) as CSSProperties

export function HomePage({
  variant,
  brandReveal = true,
  contentReveal = true,
}: Props) {
  const isTyping = variant === 'typing'
  const [activeTab, setActiveTab] = useState<HomeTab>('work')
  const contentClass = isTyping
    ? contentReveal
      ? 'home-sequential-reveal'
      : 'home-sequential-pending'
    : ''

  return (
    <div className={`site-dark min-h-svh${isTyping ? ' home-open' : ' film-grain'}`}>
      <SiteHeader
        brandHero={isTyping}
        brandReveal={isTyping ? brandReveal : undefined}
        showNav={!isTyping}
      />
      <main className={isTyping ? 'home-open-main' : undefined}>
        {!isTyping && <HeroCinematic />}
        {isTyping ? (
          <div className={contentClass}>
            <HomeTabs
              active={activeTab}
              onChange={setActiveTab}
              className="home-reveal-stage"
              style={reveal(0)}
            />
            <div className="home-open-grid home-reveal-stage" style={reveal(1)}>
              {activeTab === 'work' && (
                <section id="works" className="open-home-line work-showcases scroll-mt-24" aria-label="Works">
                  <div className="work-showcases-rail">
                    <WorkProfileHeader profile={workProfile} />
                    {workProjects.map((project) => (
                      <WorkShowcase key={project.id} project={project} />
                    ))}
                  </div>
                </section>
              )}
              {activeTab === 'playground' && <PlaygroundSection cardLayout />}
              {activeTab === 'me' && <AboutSection cardLayout />}
            </div>
            <Footer
              minimal
              showNav={false}
              className="home-reveal-stage"
              style={reveal(2)}
            />
          </div>
        ) : (
          <div>
            <PlaygroundSection />
            <WorksSection />
            <AboutSection />
          </div>
        )}
      </main>
      {isTyping ? null : <Footer showNav />}
    </div>
  )
}
