import { Page } from '@playwright/test'

async function closeExtras(page: Page): Promise<void> {
  try {
    await page.click('text=Got it!', { timeout: 3000 })
  } catch (error) {}
  try {
    await page.click('._pi_closeButton', { timeout: 3000 })
  } catch (error) {}
}

function sleep(seconds = 1.0): Promise<unknown> {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000)
  })
}

export { closeExtras, sleep }
