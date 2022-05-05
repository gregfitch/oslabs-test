import { expect } from '@playwright/test'
import { test } from './helpers'

test('users must log in to access Kinetic @C639518', async ({ kineticBaseURL, page }) => {
  // Given: a non-logged in user viewing the Kinetic webpage
  await page.goto(kineticBaseURL)
  // Then: the user is asked to log in
  const header = page.locator('.incorrect-user h1')
  await expect(header).toContainText('Looks like you‘re not logged in.')
  const logInLink = page.locator('text=log in')
  await expect(logInLink).toContainText('log in')
})
