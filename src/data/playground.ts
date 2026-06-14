export type PlaygroundDemo = 'claim-medal'

export type PlaygroundItem = {
  id: string
  title: string
  /** 相对 public/ 的封面图路径（demo 条目可省略） */
  cover?: string
  href?: string
  /** 交互 demo，渲染在 bento tile 内 */
  demo?: PlaygroundDemo
}

/** 按展示顺序排列；封面条目尺寸由 cover 宽高比自动推导 */
export const playgroundItems: PlaygroundItem[] = [
  {
    id: 'claim-medal',
    title: 'Claim Medal',
    demo: 'claim-medal',
  },
]
