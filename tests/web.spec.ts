import { expect, test } from '@playwright/test'

const BASE_URL = process.env.URL
if (BASE_URL) {
  test.use({ baseURL: BASE_URL })
}

test('Labs landing page is available', async ({ baseURL, page }) => {
  await page.goto('/general/labs')
  expect(page.url()).toBe(`${baseURL}/general/labs`)
})
