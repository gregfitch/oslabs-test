import { expect, test } from '@playwright/test'

test('Labs landing page is available', async ({ baseURL, page }) => {
  await page.goto('/general/labs')
  expect(page.url()).toBe(`${baseURL}/general/labs`)
})
