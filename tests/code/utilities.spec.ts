import { performance } from 'perf_hooks'
import { ElementHandle, expect } from '@playwright/test'
import test from '../../src/fixtures/base'
import { closeExtras, generalDemographicSurvey, randomChoice, sleep } from '../../src/utilities/utilities'
import { accountsUserSignup } from '../kinetic/helpers'

test('sleep timer using the default parameter', async () => {
  const startingTime = performance.now()
  await sleep()
  const totalTime = performance.now() - startingTime
  expect(totalTime).toBeGreaterThanOrEqual(990)
  expect(totalTime).toBeLessThanOrEqual(1010)
})

test('sleep timer with a parameter', async () => {
  const startingTime = performance.now()
  await sleep(0.5)
  const totalTime = performance.now() - startingTime
  expect(totalTime).toBeGreaterThanOrEqual(490)
  expect(totalTime).toBeLessThanOrEqual(510)
})

test('close cookie and PI modals', async ({ accountsBaseURL, page, webBaseURL }) => {
  await accountsUserSignup(page, accountsBaseURL)
  await page.goto(webBaseURL)
  await closeExtras(page)
  const notice = await page.$('.cookie-notice, .put-away, ._pi_closeButton')
  if (notice) {
    console.log(`Element: ${await page.evaluate((notice) => notice.getAttribute('outerHTML'), notice)}`)
  }
  try {
    expect(notice).toBeFalsy()
  } catch (error) {
    if (Array.isArray(notice)) {
      notice.forEach(async (node) =>
        expect(await page.evaluate((node: ElementHandle) => node.getAttribute('outerHTML'), node)).toBeNull(),
      )
    } else {
      expect(await page.evaluate((notice) => notice.getAttribute('outerHTML'), notice)).toBeNull()
    }
  }
})

test('random choice', async ({ webBaseURL, page }) => {
  expect(randomChoice([])).toBeFalsy()
  await page.goto(webBaseURL)
  const body = await page.$$('body')
  expect(randomChoice(body)['_type']).toBe('ElementHandle')
  const divs = await page.$$('div[class]')
  const div = randomChoice(divs)
  expect(divs.length).toBeGreaterThan(0)
  expect(divs.filter((element) => element === div)).toHaveLength(1)
})

test('general demographic survey form fill auto-gen', async ({ accountsBaseURL, baseURL, kineticBaseURL, page }) => {
  // Given: a user viewing the Web landing page for Kinetic
  await page.goto(`${baseURL}/kinetic`)
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
})

test('general demographic survey form fill branch a', async ({ accountsBaseURL, baseURL, kineticBaseURL, page }) => {
  // Given: a user viewing the Web landing page for Kinetic
  await page.goto(`${baseURL}/kinetic`)
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
    '',
    'Male',
    'White',
    'English',
    'High school diploma',
    'Unsure',
    '',
    'No',
    '77005',
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

test('general demographic survey form fill branch b', async ({ accountsBaseURL, baseURL, kineticBaseURL, page }) => {
  // Given: a user viewing the Web landing page for Kinetic
  await page.goto(`${baseURL}/kinetic`)
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
