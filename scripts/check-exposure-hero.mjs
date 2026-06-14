import { chromium } from 'playwright'

const BASE = process.env.CHECK_URL ?? 'http://localhost:5175/'
const EXPECT = {
  1280: 288,
  800: 248,
}

async function measure(page) {
  await page.goto(BASE, { waitUntil: 'networkidle', timeout: 30000 })
  const work = page.locator('button').filter({ hasText: /^Work$/ })
  if (await work.count()) await work.first().click()
  await page.waitForSelector('.work-exposure-hero-media', { timeout: 15000 })
  return page.locator('.work-exposure-hero-media').first().evaluate((el) => {
    const rect = el.getBoundingClientRect()
    return {
      width: Math.round(rect.width),
      height: Math.round(rect.height),
      cssWidth: getComputedStyle(el).width,
    }
  })
}

const browser = await chromium.launch({ headless: true })
let failed = false

for (const [vp, expectedWidth] of Object.entries(EXPECT)) {
  const page = await browser.newPage({
    viewport: { width: Number(vp), height: 900 },
  })
  const result = await measure(page)
  await page.close()

  const ok = Math.abs(result.width - expectedWidth) <= 2
  const mark = ok ? '✓' : '✗'
  console.log(
    `${mark} viewport ${vp}px → ${result.width}px wide (expected ~${expectedWidth}px, css ${result.cssWidth})`,
  )
  if (!ok) failed = true
}

await browser.close()
process.exit(failed ? 1 : 0)
