import { expect } from '@playwright/test'
import { accountsUserSignup, closeExtras, test } from './helpers'

test('kinetic landing page is available @C639517', async ({ baseURL, page }) => {
  // Given: a user viewing the OpenStax web page
  // **TODO** replace direct goto with link action to the Kinetic landing page
  // await page.goto('/')
  await page.goto('/general/kinetic')
  // When: they click the Kinetic link
  // await page.click('')
  // Then: the Kinetic landing page is displayed
  expect(page.url()).toBe(`${baseURL}/general/kinetic`)
})

test('users must log in to access kinetic @C639518', async ({ kineticBaseURL, page }) => {
  // Given: a non-logged in user viewing the Kinetic webpage
  await page.goto(kineticBaseURL)
  // Then: the user is asked to log in
  const header = page.locator('.incorrect-user h1')
  const link = page.locator('[data-test-id=login-link]')
  expect(header).toHaveText('Looks like you‘re not  logged in')
  expect(link).toHaveText('log in')
})

test('logged in users are taken to kinetic @C640301', async ({ accountsBaseURL, kineticBaseURL, page }) => {
  // Given: a logged in user viewing the Kinetic landing page
  await accountsUserSignup(page, accountsBaseURL)
  await page.goto('/general/kinetic')
  await closeExtras(page)
  // When: they click the 'View Kinetic studies' button
  const [newPage] = await Promise.all([page.waitForEvent('popup'), page.click('text=View Kinetic studies')])
  // Then: the Kinetic home page is displayed in a new tab
  expect(newPage.url()).toBe(`${kineticBaseURL}/`)
})
