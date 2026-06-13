/** public/ 资源在 GitHub Pages 子路径部署时须带 Vite `base` */
export function publicUrl(path: string): string {
  const p = path
    .replace(/^\//, '')
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/')
  return `${import.meta.env.BASE_URL}${p}`
}
