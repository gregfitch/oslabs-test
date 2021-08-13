import { expect, test } from '@playwright/test'

test('new students provide demographic information', async ({ baseURL, page }) => {
  // test.fail()
  await page.goto('/general/labs')
  expect(page.url()).toBe(`${baseURL}/general/labs`)
})
