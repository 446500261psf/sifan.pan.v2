export type PlaygroundItem = {
  id: string
  title: string
  /** 相对 public/ 的封面图路径 */
  cover: string
  href?: string
}

/** 按展示顺序排列；尺寸由 cover 宽高比自动推导 */
export const playgroundItems: PlaygroundItem[] = []
