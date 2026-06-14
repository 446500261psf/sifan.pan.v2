import { chromium, webkit } from 'playwright'
import { readFileSync } from 'node:fs'
import { inflateSync } from 'node:zlib'

const BASE = process.env.CHECK_URL ?? 'http://localhost:5175/'
const CHROME =
  process.env.PLAYWRIGHT_CHROME ??
  '/Users/sifan/sifan.pan.v2/.cache-pw/chromium-1223/chrome-mac-x64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing'

function readPngRgb(path) {
  const buf = readFileSync(path)
  let pos = 8
  let w = 0
  let h = 0
  const parts = []
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos)
    pos += 4
    const type = buf.toString('ascii', pos, pos + 4)
    pos += 4
    const chunk = buf.subarray(pos, pos + len)
    pos += len + 4
    if (type === 'IHDR') {
      w = chunk.readUInt32BE(0)
      h = chunk.readUInt32BE(4)
    }
    if (type === 'IDAT') parts.push(chunk)
    if (type === 'IEND') break
  }
  const raw = inflateSync(Buffer.concat(parts))
  return { w, h, rgb: (x, y) => {
    const i = y * (w * 4 + 1) + 1 + x * 4
    return [raw[i], raw[i + 1], raw[i + 2]]
  } }
}

async function gotoHandPhone(page) {
  await page.goto(BASE, { waitUntil: 'networkidle', timeout: 60000 })
  const work = page.locator('button').filter({ hasText: /^Work$/ })
  if (await work.count()) await work.first().click()
  const mockup = page.locator('.hand-phone-mockup').first()
  await mockup.waitFor({ state: 'visible', timeout: 30000 })
  await mockup.scrollIntoViewIfNeeded()
  await page.waitForTimeout(5000)
}

async function check(browserType, label, launchOpts = {}) {
  const browser = await browserType.launch(launchOpts)
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } })
  await gotoHandPhone(page)

  const ready = await page.locator('.hand-phone-mockup-media').first().evaluate((el) => ({
    readyState: el.readyState,
    videoWidth: el.videoWidth,
    paused: el.paused,
    error: el.error?.message ?? null,
  }))

  const shotPath = `/tmp/hand-phone-check-${label}.png`
  await page.locator('.hand-phone-mockup-device').first().screenshot({ path: shotPath })

  const { w, h, rgb } = readPngRgb(shotPath)
  let bright = 0
  let samples = 0
  const cx = Math.floor(w * 0.5)
  const cy = Math.floor(h * 0.48)
  const r = Math.floor(w * 0.18)
  for (let y = cy - r; y <= cy + r; y += 4) {
    for (let x = cx - r; x <= cx + r; x += 4) {
      if (x < 0 || y < 0 || x >= w || y >= h) continue
      const [r8, g8, b8] = rgb(x, y)
      if (r8 + g8 + b8 > 80) bright++
      samples++
    }
  }

  await browser.close()

  const ratio = bright / samples
  const ok = ready.readyState >= 2 && ready.videoWidth > 0 && ratio > 0.08
  console.log(
    `${ok ? '✓' : '✗'} ${label}: video readyState=${ready.readyState} brightRatio=${(ratio * 100).toFixed(1)}%`,
  )
  if (!ok) {
    console.log('  video:', ready)
    console.log('  screenshot:', shotPath)
  }
  return ok
}

let failed = false
if (!(await check(chromium, 'chromium', { executablePath: CHROME, headless: true }))) failed = true
if (!(await check(webkit, 'webkit', { headless: true }))) failed = true

process.exit(failed ? 1 : 0)
