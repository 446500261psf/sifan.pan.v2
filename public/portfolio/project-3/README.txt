Project 3 — Feature Guidance System

文件夹：

  Bento图/     Banner 封面（Bento 网格展示）
  长图/         点击 Banner 后在 iPhone mockup 内滚动展示

命名规则：
  Banner X.png  ↔  长图 X.png
  banner X.png  ↔  长图 X.png
  无长图 / VIP.png / 复活节勋章.png  → 无长图，不可点击

配置：src/data/workShowcase.ts → educationBentoItems()
长图路径由 bannerToLongImage() 按文件名自动匹配
