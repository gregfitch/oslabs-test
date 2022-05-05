import { expect } from '@playwright/test'
import { accountsUserSignup, closeExtras, generalDemographicSurvey, randomChoice, test } from './helpers'

test('new user sign up @e2e @C639507', async ({ accountsBaseURL, baseURL, kineticBaseURL, page }) => {  // eslint-disable-line
  // Given: a user viewing the Web landing page for Kinetic
  await page.goto('/kinetic')
  // When: they click the 'Sign up' button
  await closeExtras(page)
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
    surveyCompletion = page.$('h5 ~ svg [fill=green]'),
    surveyCardDisabled = page.$('.card[aria-disabled=true]')
  expect(modalNotFound).toBe(null)
  expect(await surveyCompletion).toBeTruthy()
  expect(await surveyCardDisabled).toBeTruthy()
  // When: they select a study
  const studies = await page.$$('.card[aria-disabled=false]')
  await randomChoice(studies).click()
  // Then: the study details page is displayed
  expect(page.url()).toMatch(new RegExp(`${kineticBaseURL}\/study\/details\/[0-9]{0,5}`))
  // When: they click the 'Begin study' button
  await Promise.all([page.waitForNavigation(), page.click('text=Begin study')])
  // Then: they are taken to the Qualtrics study
  expect(page.url()).toMatch(`qualtrics\.com`)
})
