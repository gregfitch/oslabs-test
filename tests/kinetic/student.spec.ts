import { expect } from '@playwright/test'
import { accountsUserSignup, generalDemographicSurvey, randomChoice, test, userSignIn } from './helpers'

test('new user sign up @e2e @C639507', async ({ accountsBaseURL, baseURL, kineticBaseURL, page }) => {  // eslint-disable-line
  // Given: a user viewing the Web landing page for Kinetic
  await page.goto('/kinetic')
  // When: they click the 'Sign up' button
  await page.click('text=Sign up')
  // Then: the Accounts log in page is displayed
  expect(page.url()).toBe(`${accountsBaseURL}/i/signup?r=${kineticBaseURL}/`)
  // When: they completed the sign up process
  // And:  click the 'Finish' button
  await accountsUserSignup(page)
  // Then: they are taken to the Kinetic participant dashboard
  // And:  the demographic survey modal is displayed
  expect(page.url()).toMatch(new RegExp(`${kineticBaseURL}\/(studies)?`))
  const surveyTitle = page.locator('.modal-title')
  await expect(surveyTitle).toHaveText('Demographic Survey')
  // When: they complete the survey
  // And:  click the 'Return to view other studies' button
  await generalDemographicSurvey(page)
  // Then: the modal is closed
  // And:  a green completion checkmark is displayed on the demographic survey card
  // And:  the demographic survey card is greyed out and inactive
  const modalNotFound = await page.$('body.model-open'),
    surveyCompletion = page.locator('h5 ~ svg [fill=green]'),
    surveyCardDisabled = page.locator('.card[aria-disabled=true]')
  expect(modalNotFound).toBe(null)
  expect(surveyCompletion).toBeTruthy()
  expect(surveyCardDisabled).toBeTruthy()
  // When: they select a study
  const studies = await page.$$('text=Research Studies >> .card[aria-disabled=false]')
  await randomChoice(studies).click()
  // Then: the study details page is displayed
  expect(page.url()).toContainText('/details/')
  // When: they click the 'Begin study' button
  await Promise.all([page.click('text=Begin study')])
  // Then: they are taken to the Qualtrics study
  expect(page.url()).toContainText('qualtrics.com')
})

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
  await page.goto(accountsBaseURL)
  await page.click('text=Log out')
  await page.goto(kineticBaseURL)
  await userSignIn(page, student)
  // Then: the demographic survey modal is displayed
  const surveyTitle2 = page.locator('div[role="document"] >> text=Demographic Survey')
  expect(surveyTitle2).toBeTruthy()
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
test('returning user who completed the demographic survey @C639509', async ({ baseURL, page }) => {
  // Given: a user viewing the Web landing page
  await page.goto('/kinetic')
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
