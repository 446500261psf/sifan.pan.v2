# 浮雕勋章样式 v1（冻结快照）

当前 Claim Medal 卡片使用的单色浮雕 + 橡皮擦揭示效果。此目录为**只读参考**，运行时仍以 `src/` 下对应文件为准。

## 视觉特征

- 背景与受光面同色：`#f2f2ee`
- 右上主光，左下阴影，体积感由 height + normal 混合驱动
- 鼠标擦拭揭示 `base.png`，停手后拖尾快速溶解回浮雕

## 目录

| 文件 | 说明 |
|------|------|
| `style.json` | 全部数值参数 |
| `shaders/` | 冻结的 GLSL 源码副本 |
| `preview-relief.png` | 纯浮雕态预览（无揭示） |
| `assets/` | 与 v1 配套的 height / normal 贴图副本 |

## 贴图

- 彩色底图：`../base.png`
- 高度 / 法线：见 `assets/`，由 `scripts/generate-medal-normal.py` 生成（blur 2.8，strength 3.2）

## 代码入口

- 常量：`src/lib/medalReveal/reliefStyle.v1.ts`
- Shader：`src/lib/medalReveal/shaders.ts` → `RELIEF_ERASE_FRAG`
- 组件：`src/components/playground/MedalReliefCanvas.tsx`

## 恢复 / 迭代

- **恢复 v1**：对照本目录 `style.json` 与 `shaders/` 同步 `src/` 文件
- **新版本**：复制本目录为 `relief-style-v2/`，新建 `reliefStyle.v2.ts`，勿覆盖 v1
