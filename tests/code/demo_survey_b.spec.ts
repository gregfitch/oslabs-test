import { expect } from '@playwright/test'
import test from '../../src/fixtures/base'
import { closeExtras, generalDemographicSurvey } from '../../src/utilities/utilities'
import { accountsUserSignup } from '../kinetic/helpers'

test('general demographic survey form fill branch b', async ({ accountsBaseURL, baseURL, kineticBaseURL, page }) => {
  // Given: a user viewing the Web landing page for Kinetic
  await page.goto(`${baseURL}/kinetic`)
  await closeExtras(page)
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
  await generalDemographicSurvey(
    page,
    'From email',
    '2000',
    'Female',
    'White',
    '普通话',
    'High school diploma',
    'Unsure',
    'Something',
    'Yes',
    '',
  )
  // Then: the modal is closed
  // And:  a green completion checkmark is displayed on the demographic survey card
  // And:  the demographic survey card is greyed out and inactive
  const modalNotFound = await page.$('body.model-open'),
    surveyCompletion = page.locator('h5 ~ svg [fill=green]'),
    surveyCardDisabled = page.locator('.card[aria-disabled=true]')
  expect(modalNotFound).toBe(null)
  expect(surveyCompletion).toBeTruthy()
  expect(surveyCardDisabled).toBeTruthy()
})
