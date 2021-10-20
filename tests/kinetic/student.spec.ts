import { expect } from '@playwright/test'
import { userSignIn } from '../../src/utilities/user'
import { accountsUserSignup, test } from './helpers'

test('new user sign up @e2e @C639507', async ({ accountsBaseURL, baseURL, kineticBaseURL, page }) => {  // eslint-disable-line
  // Given: a user viewing the Web landing page for kinetic
  await page.goto('/general/labs')
  // When: they click the 'Sign up' button
  const [newTab] = await Promise.all([page.waitForEvent('popup'), page.click('text=Sign up')])
  // Then: the Accounts log in page is displayed in a new tab
  expect(newTab.url()).toBe(`${accountsBaseURL}/i/signup/?r=${kineticBaseURL}`)
  // When: they completed the sign up process
  // And:  click the 'Finish' button
  await accountsUserSignup(newTab)
  // Then: they are taken to the kinetic participant dashboard
  // And:  the demographic survey modal is displayed
  expect(newTab.url()).toBe(`${kineticBaseURL}/studies`)
  const surveyTitle = newTab.locator('.modal-title')
  expect(surveyTitle).toHaveText('General Demographic Survey')
  // When: they complete the survey
  // And:  click the 'Return to view other studies' button

  // Then: the modal is closed
  // And:  a green completion checkmark is displayed on the demographic survey card
  // And:  the demographic survey card is greyed out and inactive

  // When: they select a study

  // Then: the study details page is displayed

  // When: they click the 'Begin study' button

  // Then: they are taken to the Qualtrics study
})

test('returning user who did not complete the demographic survey see it again @C639508', async ({
  accountsBaseURL,
  kineticBaseURL,
  page,
}) => {
  // Setup:
  const student = await accountsUserSignup(page, accountsBaseURL)
  // Given: a user viewing the kinetic home page
  await page.goto(kineticBaseURL)
  // Then: the demographic survey modal is displayed
  const surveyTitle = page.locator('.modal-title')
  expect(surveyTitle).toHaveText('General Demographic Survey')
  // When: they log out
  // And:  open the kinetic home page
  // And:  log back in
  await page.goto(accountsBaseURL)
  await page.click('text=Log out')
  await page.goto(kineticBaseURL)
  await userSignIn(page, student)
  // Then: the demographic survey modal is displayed
  const surveyTitle2 = page.locator('.modal-title')
  expect(surveyTitle2).toHaveText('General Demographic Survey')
})

test('returning user who completed the demographic survey @C639509', async ({ page }) => {
  // Given: a user viewing the Web landing page
  // When: they click the "Log in" button
  // Then: the Accounts log in page is displayed in a new tab
  // When: they complete the log in process
  // Then: they are taken to the kinetic participant dashboard
  // And:  a green completion checkmark is displayed on the survey card
  // And:  the survey card is greyed out and inactive
})

test('current user selects a survey @C639510', async ({ page }) => {
  // Given: a logged in user viewing the kinetic participant dashboard
  // When: they select a survey
  // Then: the survey modal is opened
})

test('current user selects a study @C639511', async ({ page }) => {
  // Given: a logged in user viewing the kinetic participant dashboard
  // When: they select a study
  // Then: the study details page is displayed
  // When: they click the "Begin study" button
  // Then: they are taken to the Qualtrics study
})
