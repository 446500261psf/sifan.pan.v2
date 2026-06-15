export type WorkExposureCase = {
  title: string
  description: string
  layout: 'hero' | 'module'
  screen?: WorkScreen
  /** hero：左侧环境光背景图 */
  backgroundLight?: WorkScreen
  /** module：右上大图 */
  featureScreen?: WorkScreen
  /** module：右上叠卡轮播（morning / noon / night），替代 featureScreen */
  featureStackScreens?: WorkScreen[]
  /** module：底部 user journey（左图 + 右文案） */
  journey?: {
    title: string
    description: string
    screen: WorkScreen
  }
  /** @deprecated 使用 journey */
  journeyScreen?: WorkScreen
  /** module：底部用户流（带箭头连接） */
  flowScreens?: WorkScreen[]
  backgroundScreens?: WorkScreen[]
  rowScreens?: WorkScreen[]
}

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
  /** 切换该 screen 时显示的副标题文案 */
  description?: string
  /** MacBook 地址栏 URL（缺省由 alt 生成） */
  pageUrl?: string
}

export type WorkBentoPlacement = {
  colStart: number
  colSpan: number
  rowStart: number
  rowSpan: number
}

/** Figma 画板内绝对定位（px） */
export type WorkBentoFrameRect = {
  x: number
  y: number
  width: number
  height: number
}

export type WorkBentoFrame = {
  width: number
  height: number
}

export type WorkBentoItem = {
  id: string
  /** Bento 网格封面 */
  banner: string
  /** 点击后展示的长图；无则仅展示 banner */
  longImage?: string
  alt: string
  rev?: string
  /** 封面宽高比，避免加载前格子比例错误 */
  aspectRatio?: number
  /** PC 端 12 列网格定位 */
  placement?: WorkBentoPlacement
  /** Figma 画板内绝对定位 */
  frame?: WorkBentoFrameRect
  /** 重叠时的叠放顺序 */
  zIndex?: number
  /** 封面图在容器内的对齐（配合 object-fit: cover） */
  objectPosition?: string
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
  /** 单个宽屏 / MacBook / 倾斜 iPhone / 手拿手机 / Bento 网格 mockup */
  mockupLayout?: 'widescreen' | 'macbook' | 'angled-phone' | 'hand-phone' | 'bento'
  /** split：mockup 左栏 + 标题/描述右栏底对齐 */
  panelLayout?: 'split' | 'exposure'
  /** exposure 布局：多段 case（Figma 草稿） */
  exposureCases?: WorkExposureCase[]
  screens?: WorkScreen[]
  /** bento 布局：banner 网格 + 长图 */
  bentoItems?: WorkBentoItem[]
  /** bento Figma 画板尺寸（配合 item.frame 使用） */
  bentoFrame?: WorkBentoFrame
  /** 第二行 mockup（可选） */
  screensRow2?: WorkScreen[]
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

/** 06 — 华沙半马活动，已从展示中移除 */
const CAMPAIGN_SCROLL_FILES = ['01', '02', '03', '04', '05', '07', '08', '09', '10'] as const

function campaignScrollScreens(rev: string): WorkScreen[] {
  return CAMPAIGN_SCROLL_FILES.map((n, index) => ({
    file: `portfolio/project-4/campaign-scroll/${n}.png`,
    alt: 'Lifecycle marketing campaign',
    pageUrl: 'health.huawei.com/campaigns/lifecycle-marketing',
    themeColor: CAMPAIGN_THEME_COLORS[index],
    scroll: true,
    rev: n === '10' ? '202506142309' : rev,
  }))
}

function handPhoneScreens(rev: string): WorkScreen[] {
  return [
    {
      file: 'portfolio/project-5/hand-phone-scroll/new-vip-page.mp4',
      kind: 'video',
      label: 'New VIP Page',
      alt: 'HUAWEI Health+ VIP membership page',
      description:
        'Built a membership landing page from the ground up, curating exclusive resources and premium features through modular content design to enhance membership value perception and engagement.',
      rev,
    },
    {
      file: 'portfolio/project-5/hand-phone-scroll/new-device-page.mp4',
      kind: 'video',
      label: 'New Device Page',
      alt: 'HUAWEI Health+ device page',
      description:
        'Designed a device-centric landing page focused on usage guidance, leveraging categorized content and educational tags to improve product understanding and drive conversion of legacy devices.',
      rev,
    },
  ]
}

const EDUCATION_BENTO_BASE = 'portfolio/project-3/Bento图'
const EDUCATION_LONG_BASE = 'portfolio/project-3/长图'

/** Figma node 15657:106 — Frame 106 */
export const EDUCATION_BENTO_FRAME: WorkBentoFrame = {
  width: 1131,
  height: 1367,
}

/** Banner 文件名 → 长图路径；无长图 / 复活节勋章 / VIP 方图返回 undefined */
function bannerToLongImage(bannerFile: string): string | undefined {
  if (
    bannerFile.includes('无长图') ||
    bannerFile === '复活节勋章.png' ||
    bannerFile === 'VIP.png'
  ) {
    return undefined
  }

  const match = bannerFile.match(/^(?:Banner|banner)\s+(.+)$/i)
  if (!match) return undefined

  return `${EDUCATION_LONG_BASE}/长图 ${match[1]}`
}

function educationBentoItems(rev: string): WorkBentoItem[] {
  const item = (
    id: string,
    bannerFile: string,
    alt: string,
    frame: WorkBentoFrameRect,
    aspectRatio: number,
    zIndex?: number,
    objectPosition?: string,
  ): WorkBentoItem => ({
    id,
    banner: `${EDUCATION_BENTO_BASE}/${bannerFile}`,
    longImage: bannerToLongImage(bannerFile),
    alt,
    aspectRatio,
    frame,
    zIndex,
    objectPosition,
    rev,
  })

  return [
    item('get-most', 'Banner get most.png', 'Get the most from your watch', { x: 0, y: 0, width: 489, height: 284 }, 1905 / 1107),
    item('quicko', 'VIP.png', 'Quicko — 20% promotion', { x: 508, y: 0, width: 242, height: 251 }, 459 / 477),
    item('active-rings-color', 'Banner 无长图.png', 'Active Rings — colorful overview', { x: 0, y: 299, width: 488, height: 274 }, 2688 / 1512),
    item('quicko-wide', 'Banner Quicko.png', 'Quicko — Double Tap and Pay', { x: 0, y: 587, width: 489, height: 145 }, 2688 / 1152, undefined, 'left center'),
    item('active-rings-wide', 'Banner 无长图-1.png', 'Active Rings — feature overview', { x: 511, y: 469, width: 618, height: 267 }, 2742 / 1175),
    item('multipass', 'Banner Multipass.png', 'Multipass feature guidance', { x: 0, y: 750, width: 673, height: 199 }, 2688 / 796),
    item('what-is-new', 'Banner what is new.png', 'What is new guidance', { x: 688, y: 750, width: 442, height: 199 }, 1509 / 678),
    item('pro-level', 'banner pro level.png', 'Pro-level outdoor sports guidance', { x: 0, y: 964, width: 321, height: 401 }, 1333 / 1662),
    item('offline-map', 'banner offline map.png', 'Offline Maps guidance', { x: 335, y: 964, width: 327, height: 191 }, 1296 / 760),
    item('explore-pass', 'Banner ExplorePass.png', 'Explore Pass guidance', { x: 679, y: 964, width: 452, height: 195 }, 2661 / 1152),
    item('ecg', 'banner ECG.png', 'ECG measurement guidance', { x: 336, y: 1173, width: 327, height: 192 }, 1296 / 760),
    item('d2', 'Banner D2.png', 'D2 feature guidance', { x: 678, y: 1173, width: 453, height: 194 }, 2688 / 1152),
    item('smart-training', 'Banner Smart training.png', 'Smart training guidance', { x: 767, y: 4, width: 361, height: 451 }, 1330 / 1661, 2),
    item('easter-medal', '复活节勋章.png', 'Easter medal campaign', { x: 528, y: 259, width: 201, height: 201 }, 440 / 440, 3),
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
    title: 'Campaign & Conversion Design',
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
    title: 'Campaign & Conversion Design',
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
    title: 'Campaign & Conversion Design',
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
    panelLayout: 'exposure',
    description: '',
    exposureCases: [
      {
        title: 'Sleep Pop-up',
        layout: 'hero',
        description:
          'Encourage healthy bedtime habits and increase engagement with sleep-tracking features. Achieved a 43% CTR through optimized messaging, timing, and visual hierarchy.',
        screen: {
          kind: 'video',
          file: 'portfolio/project-2/01-video.mp4',
          alt: 'Sleep Music Blind Box campaign',
          rev: '2025061501',
        },
        backgroundLight: {
          file: 'portfolio/project-2/bg light.png',
          alt: '',
          rev: '2025061403',
        },
      },
      {
        title: 'Sleep module',
        layout: 'module',
        description:
          'Introduced a time-segmented content distribution strategy for sleep audio—curating thematic bundles aligned with daily context raised module CTR to 15%. Optimized last-mile membership conversion with clearer benefit modules across audio types, lifting music usage by 3% and improving conversions within the audio module.',
        featureStackScreens: [
          {
            file: 'portfolio/project-2/03-1.png',
            alt: 'Sleep module — contextual morning experience',
            rev: '2025060705',
          },
          {
            file: 'portfolio/project-2/03-2.png',
            alt: 'Sleep module — contextual afternoon experience',
            rev: '2025060705',
          },
          {
            file: 'portfolio/project-2/03-3.png',
            alt: 'Sleep module — contextual night experience',
            rev: '2025060705',
          },
        ],
        journey: {
          title: 'User Journey',
          description:
            "Combined Sleep Summary and Sleep Music into a single experience, enabling users to review their previous night's sleep insights while enjoying relaxing audio.",
          screen: {
            file: 'portfolio/project-2/User Journey.png',
            alt: 'Sleep module — user journey from dashboard to music player',
            rev: '2025061402',
          },
        },
      },
    ],
  },
  {
    id: 'hand-phone-campaigns',
    title: 'Primary Page Design & Build',
    mockupLayout: 'hand-phone',
    description:
      'Built a membership landing page from the ground up, curating exclusive resources and premium features through modular content design to enhance membership value perception and engagement.',
    screens: handPhoneScreens('2025061502'),
  },
  {
    id: 'lifecycle-marketing',
    title: 'Lifecycle & Marketing Campaigns',
    mockupLayout: 'macbook',
    description:
      'Drive user engagement and retention through targeted campaigns, while partnering with local marketing teams to create integrated online and offline initiatives that strengthen brand awareness and support hardware sales.',
    screens: campaignScrollScreens('20250612'),
  },
  {
    id: 'education',
    title: 'Feature Guidance System',
    mockupLayout: 'bento',
    description:
      'Design in-app descriptions of product features and explanations of membership benefits tailored to different usage scenarios',
    bentoFrame: EDUCATION_BENTO_FRAME,
    bentoItems: educationBentoItems('20250616'),
  },
]
