import { SectionHeading } from '../SectionHeading'

type Props = {
  cardLayout?: boolean
}

const highlights = [
  'Product design for conversion, engagement, and in-app education',
  'Comfortable with AI-assisted prototyping and design–engineering handoff',
  'Background in structured case storytelling and measurable impact',
] as const

export function AboutSection({ cardLayout = false }: Props) {
  return (
    <section
      aria-labelledby="about-heading"
      id="about"
      className={
        cardLayout
          ? 'open-home-card scroll-mt-24'
          : 'px-5 py-16 sm:px-8 sm:py-24'
      }
    >
      <div
        className={
          cardLayout
            ? 'grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12'
            : 'mx-auto grid max-w-5xl gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-16'
        }
      >
        <div
          className="open-card flex aspect-[4/5] max-w-sm items-center justify-center text-sm text-ink-muted"
          aria-label="Portrait placeholder"
        >
          头像 / 照片
          <br />
          public/portfolio/about/
        </div>
        <div>
          {!cardLayout && (
            <SectionHeading
              eyebrow="03 — 自我介绍"
              title="About"
              subtitle="我是 Sifan Pan，产品设计师，关注增长、转化与复杂功能的教育化表达。"
            />
          )}
          <p className={`open-desc text-base leading-relaxed text-ink${cardLayout ? '' : ' mt-6'}`}>
            我擅长把商业目标、用户行为和产品能力放进同一条叙事里：从活动与会员设计，到高曝光位与激励视觉，再到新功能的上手引导。
            这个站点 v2 把 <strong className="font-medium text-ink">AI Playground</strong>、
            <strong className="font-medium text-ink"> Works </strong>
            和自我介绍分成三块，方便你快速了解我的实验方向与正式案例。
          </p>
          <ul className="mt-8 space-y-3">
            {highlights.map((line) => (
              <li key={line} className="open-desc flex gap-3 text-sm leading-relaxed text-ink">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                {line}
              </li>
            ))}
          </ul>
          <div id="contact" className="mt-10 flex flex-wrap gap-3 scroll-mt-20">
            <a
              href="mailto:hello@example.com"
              className="inline-flex rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              联系我
            </a>
            <a
              href="https://github.com/446500261psf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full border border-white/10 bg-surface px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-white/20"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
