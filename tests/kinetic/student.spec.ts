import { expect } from '@playwright/test'
import { accountsUserSignup, sleep, test, userSignIn } from './helpers'

test('returning user who did not complete the demographic survey see it again @C639508', async ({
  accountsBaseURL,
  kineticBaseURL,
  page,
}) => {
  // Setup:
  const student = await accountsUserSignup(page, accountsBaseURL)
  // Given: a user viewing the Kinetic home page
  await page.goto(kineticBaseURL)
  // Then: the demographic survey modal is displayed
  const surveyTitle = page.locator('div[role="document"] >> text=Demographic Survey')
  expect(surveyTitle).toBeTruthy()
  // When: they log out
  // And:  open the Kinetic home page
  // And:  log back in
  // await page.goto(accountsBaseURL)
  await sleep(1)
  await page.goto(accountsBaseURL)
  await page.click('text=Log out')
  await page.goto(kineticBaseURL)
  await userSignIn(page, student)
  // Then: the demographic survey modal is displayed
  const surveyTitle2 = page.locator('div[role="document"] >> text=Demographic Survey')
  expect(surveyTitle2).toBeTruthy()
})

test('returning user who completed the demographic survey @C639509', async ({ baseURL, page }) => {
  // Given: a user viewing the Web landing page
  await page.goto(`${baseURL}/kinetic`)
  // When: they click the "Log in" button
  // Then: the Accounts log in page is displayed in a new tab
  // When: they complete the log in process
  // Then: they are taken to the Kinetic participant dashboard
  // And:  a green completion checkmark is displayed on the survey card
  // And:  the survey card is greyed out and inactive
})

test('current user selects a survey @C639510', async ({ kineticBaseURL, page }) => {
  // Given: a logged in user viewing the Kinetic participant dashboard
  await page.goto(kineticBaseURL)
  // When: they select a survey
  // Then: the survey modal is opened
})

test('current user selects a study @C639511', async ({ kineticBaseURL, page }) => {
  // Given: a logged in user viewing the Kinetic participant dashboard
  await page.goto(kineticBaseURL)
  // When: they select a study
  // Then: the study details page is displayed
  // When: they click the "Begin study" button
  // Then: they are taken to the Qualtrics study
})
