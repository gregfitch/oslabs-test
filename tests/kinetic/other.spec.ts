import { expect } from '@playwright/test'
import { test } from './helpers'

test('users must log in to access Kinetic @C639518', async ({ kineticBaseURL, page }) => {
  // Given: a non-logged in user viewing the Kinetic webpage
  await page.goto(kineticBaseURL)
  // Then: the user is asked to log in
  const header = page.locator('.incorrect-user h1')
  const link = page.locator('[data-test-id=login-link]')
  expect(header).toHaveText('Looks like you‘re not logged in')
  expect(link).toHaveText('log in')
})
