Hand Phone Mockup — 素材说明

请把以下文件放在本文件夹：

  mockup-overlay.png
    手拿手机 mockup 贴图（PNG，透明底）。
    手机屏幕区域应为透明，长图从下方透出；手、边框、阴影保留在贴图上。

  screen-mask.png
    屏幕蒙版（PNG，黑白图）。
    白色 = 可见区域，黑色 = 裁切掉。用于精确贴合非矩形屏幕。

  mockup.png（可选）
    完整参考图，方便对齐屏幕 inset，不参与页面渲染。

屏幕 inset（长图显示区域）在 src/components/HandPhoneMockup.tsx 顶部常量中调整：
  SCREEN_INSET = { top, right, bottom, left }  // 百分比

替换 mockup 后更新 HandPhoneMockup.tsx 里的 MOCKUP_REV 以刷新缓存。
