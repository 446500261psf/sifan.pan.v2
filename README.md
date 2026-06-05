# sifan.pan.v2

Sifan Pan 作品集 v2 — React + TypeScript + Vite + Tailwind CSS v4。

## 本地开发

```bash
npm install
npm run dev
```

默认：<http://localhost:5175/>

## 构建与预览（模拟 GitHub Pages 子路径）

```bash
BASE_PATH=/sifan.pan.v2/ npm run build
BASE_PATH=/sifan.pan.v2/ npx vite preview
```

## 发布到 GitHub Pages

1. 在 GitHub 新建仓库 `sifan.pan.v2`（或任意名；`BASE_PATH` 会与仓库名对齐）。
2. `git remote add origin …` 后 `git push -u origin main`。
3. 仓库 **Settings → Pages → Source** 选 **GitHub Actions**。
4. 等待 workflow **Deploy to GitHub Pages** 完成。

## 目录结构

```
src/
  components/   # 页面区块
  data/         # 项目元数据
  publicUrl.ts  # 静态资源 base 路径
```
