export type WorkScreen = {
  alt: string
  /** 替换素材后递增，避免浏览器缓存旧图 */
  rev?: string
  kind?: 'image' | 'video' | 'auto-cycle' | 'empty' | 'popup-motion'
  /** popup-motion：底层页面 */
  base?: string
  /** popup-motion：弹窗层 */
  popup?: string
  /** popup-motion：弹窗高度占屏比例 */
  popupHeightRatio?: number
  file?: string
  /** auto-cycle 时轮播的图片路径 */
  slides?: string[]
  /** widescreen mockup 内纵向滚动长图 */
  scroll?: boolean
  /** 活动切换按钮文案 */
  label?: string
  /** 活动主题色（切换按钮背景） */
  themeColor?: string
}

export type WorkProfile = {
  logo: string
  role: string
  period: string
}

export type WorkProject = {
  id: string
  title: string
  /** 同一主标题下的分组 id */
  groupId?: string
  /** 分组内后续 case 不重复显示主标题 */
  hideTitle?: boolean
  /** 项目小标题（可选） */
  subtitle?: string
  description: string
  /** 单个宽屏 / MacBook / 倾斜 iPhone / 手拿手机 mockup（宽度对齐三列 iPhone） */
  mockupLayout?: 'widescreen' | 'macbook' | 'angled-phone' | 'hand-phone'
  screens: WorkScreen[]
  /** 第二行 mockup（可选） */
  screensRow2?: WorkScreen[]
}

function projectScreens(
  dir: string,
  alts: [string, string, string],
): WorkScreen[] {
  return [
    { file: `${dir}/01.png`, alt: alts[0] },
    { file: `${dir}/02.png`, alt: alts[1] },
    { file: `${dir}/03.png`, alt: alts[2] },
  ]
}

const CAMPAIGN_THEME_COLORS = [
  '#C9A99A',
  '#B5C2A3',
  '#8EACC4',
  '#C4B09F',
  '#B89AAD',
  '#94B89F',
  '#C19288',
  '#8A9DB5',
  '#BDB0A2',
] as const

function campaignScrollScreens(rev: string): WorkScreen[] {
  return CAMPAIGN_THEME_COLORS.map((themeColor, index) => {
    const n = String(index + 1).padStart(2, '0')
    return {
      file: `portfolio/project-4/campaign-scroll/${n}.png`,
      alt: `Lifecycle marketing campaign ${n}`,
      themeColor,
      scroll: true,
      rev,
    }
  })
}

function handPhoneScrollScreens(rev: string): WorkScreen[] {
  return [
    {
      file: 'portfolio/project-5/hand-phone-scroll/01.png',
      alt: 'Hand phone campaign 1',
      themeColor: CAMPAIGN_THEME_COLORS[0],
      scroll: true,
      rev,
    },
  ]
}

export const workProfile: WorkProfile = {
  logo: 'portfolio/huawei-health/logo.png',
  role: 'UX/UI Designer, HUAWEI Health',
  period: '2024 — 2026, Düsseldorf',
}

/** V1 顺序：Monetization → Growth → Education */
export const workProjects: WorkProject[] = [
  {
    id: 'monetization',
    groupId: 'promotional',
    title: 'Promotional Campaign & Conversion Design',
    subtitle: 'Co-branded Membership Campaign',
    description:
      'Leveraged high-visibility placements to drive potential members to the membership page, then built the shortest conversion path with an H5 long-scroll landing experience and a persistent payment bar.',
    screens: [
      {
        file: 'portfolio/project-1/01.png',
        alt: 'Qobuz × Health+ co-branded membership landing',
        rev: '20250606',
      },
      {
        file: 'portfolio/project-1/02.png',
        alt: 'End-to-end campaign user journey',
        rev: '20250606',
      },
      {
        file: 'portfolio/project-1/03 video.mov',
        alt: 'Black Friday seasonal promotion assets',
      },
    ],
  },
  {
    id: 'seasonal-promotion',
    groupId: 'promotional',
    hideTitle: true,
    title: 'Promotional Campaign & Conversion Design',
    subtitle: 'Seasonal Promotion',
    description:
      'Led the design of campaign assets for major marketing events, ensuring scalable and consistent brand expression across all platforms. By standardizing visual language and design execution, the work reinforced brand identity and improved cohesion across diverse user touchpoints during high-traffic campaigns.',
    screens: [
      {
        file: 'portfolio/project-1/04.png',
        alt: 'Seasonal campaign asset — platform placement',
        rev: '20250607',
      },
      {
        file: 'portfolio/project-1/05.png',
        alt: 'Seasonal campaign asset — visual system',
        rev: '20250607',
      },
      {
        file: 'portfolio/project-1/06.png',
        alt: 'Seasonal campaign asset — cross-platform execution',
        rev: '20250607',
      },
    ],
  },
  {
    id: 'retention-offer',
    groupId: 'promotional',
    hideTitle: true,
    title: 'Promotional Campaign & Conversion Design',
    subtitle: 'Retention Offer',
    description:
      'Designed retention offer experiences for members nearing renewal, pairing personalized incentives with clear benefit communication to reduce churn. Extended the campaign visual system to tablet surfaces, keeping offers consistent, legible, and action-oriented at high-intent decision moments.',
    screens: [
      {
        kind: 'popup-motion',
        base: 'portfolio/project-1/retention-motion/07-base.png',
        popup: 'portfolio/project-1/retention-motion/07-popup.png',
        popupHeightRatio: 1803 / 2622,
        alt: 'Retention offer — exclusive monthly promotion popup',
        rev: '20250612',
      },
      {
        kind: 'popup-motion',
        base: 'portfolio/project-1/retention-motion/08-base.png',
        popup: 'portfolio/project-1/retention-motion/08-popup.png',
        popupHeightRatio: 1270 / 2622,
        alt: 'Retention offer — renewal incentive popup',
        rev: '20250612',
      },
      {
        kind: 'popup-motion',
        base: 'portfolio/project-1/retention-motion/09-base.png',
        popup: 'portfolio/project-1/retention-motion/09-popup.png',
        popupHeightRatio: 1270 / 2622,
        alt: 'Retention offer — membership extension popup',
        rev: '20250612',
      },
    ],
  },
  {
    id: 'engagement',
    title: 'High-Exposure Communication',
    description:
      'Introduced a time-segmented content distribution strategy for sleep audio—curating thematic bundles aligned with daily context raised module CTR to 15%. Optimized last-mile membership conversion with clearer benefit modules across audio types, lifting music usage by 3% and improving conversions within the audio module.',
    screens: [
      {
        kind: 'video',
        file: 'portfolio/project-2/01 Video.mov',
        alt: 'Sleep Music Blind Box campaign',
        rev: '2025060701',
      },
      {
        file: 'portfolio/project-2/02.png',
        alt: 'Last-mile membership conversion optimization',
        rev: '2025060701',
      },
      {
        kind: 'auto-cycle',
        alt: 'Contextual sleep music experience — time-based content targeting',
        rev: '2025060701',
        slides: [
          'portfolio/project-2/03-1.png',
          'portfolio/project-2/03-2.png',
          'portfolio/project-2/03-3.png',
        ],
      },
    ],
    screensRow2: [
      {
        file: 'portfolio/project-2/04.png',
        alt: 'Sleep insights — empty state',
        rev: '2025060701',
      },
      {
        file: 'portfolio/project-2/05.png',
        alt: 'Sleep Music category library',
        rev: '2025060701',
      },
      {
        file: 'portfolio/project-2/06.png',
        alt: 'Interstellar music player',
        rev: '2025060701',
      },
    ],
  },
  {
    id: 'lifecycle-marketing',
    title: 'Lifecycle & Marketing Campaigns',
    mockupLayout: 'macbook',
    description:
      'Drive user engagement and retention through targeted campaigns, while partnering with local marketing teams to create integrated online and offline initiatives that strengthen brand awareness and support hardware sales.',
    screens: campaignScrollScreens('20250610'),
  },
  {
    id: 'hand-phone-campaigns',
    title: 'Mobile Campaign Experience',
    mockupLayout: 'hand-phone',
    description:
      'In-app campaign experiences designed for mobile touchpoints—scroll through each activation inside a hand-held device mockup.',
    screens: handPhoneScrollScreens('20250611'),
  },
  {
    id: 'education',
    title: 'Feature Guidance System',
    description:
      'Led contextual guidance for outdoor running on HUAWEI WATCH FIT 4 Pro—bridging feature awareness and real-world usage with scenario-specific content, achieving an 8% CTR. Designed structured benefit pages for new membership features, reducing cognitive friction and increasing feature usage by 1.7% within two weeks.',
    screens: projectScreens('portfolio/project-3', [
      'Outdoor scenario feature adoption',
      'Offline maps and trail run guidance',
      'Membership value communication page',
    ]),
  },
]
