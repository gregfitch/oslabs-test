import { expect } from '@playwright/test'
import { accountsUserSignup, closeExtras, test } from './helpers'

test('kinetic landing page is available @C639517', async ({ baseURL, page }) => {
  // Given: a user viewing the OpenStax web page
  // **TODO** replace direct goto with link action to the Kinetic landing page
  // await page.goto('/')
  await page.goto('/kinetic')
  // When: they click the Kinetic link
  // await page.click('')
  // Then: the Kinetic landing page is displayed
  expect(page.url()).toBe(`${baseURL}/kinetic`)
})

test('logged in users are taken to kinetic @C640301', async ({ accountsBaseURL, baseURL, kineticBaseURL, page }) => {
  // Given: a logged in user viewing the Kinetic landing page
  await accountsUserSignup(page, accountsBaseURL)
  await page.goto(`${baseURL}/kinetic`)
  await closeExtras(page)
  // When: they click the 'View available studies' button
  await page.click('text=View available studies')
  // Then: the Kinetic home page is displayed in a new tab
  expect(page.url()).toBe(`${kineticBaseURL}/`)
})
