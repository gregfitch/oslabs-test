import { ElementHandle, Page } from '@playwright/test'
import {
  setBackground,
  setBirthYear,
  setEducation,
  setEmployment,
  setGenderChoice,
  setLanguage,
  setLunchStatus,
  setParentEducation,
  setZipCode,
} from './demo_survey'

async function closeExtras(page: Page, retries = 5): Promise<void> {
  try {
    await page.click('text=Got it!', { timeout: 500 })
  } catch (error) {}
  try {
    await page.click('lower-sticky-note-content > .put-away', { timeout: 500 })
  } catch (error) {}
  try {
    await page.click('._pi_closeButton', { timeout: 500 })
  } catch (error) {}
  const extras = await page.isVisible('.cookie-notice button, lower-sticky-note-content > .put-away, ._pi_closeButton')
  /* istanbul ignore if */
  if (retries > 0 && extras) {
    await sleep(1)
    return await closeExtras(page, retries - 1)
  }
}

async function generalDemographicSurvey(
  page: Page,
  birthYear = '',
  gender = '',
  racial = '',
  language = '',
  education = '',
  parentsEducation = '',
  employment = '',
  freeLunch = '',
  zipCode = '',
): Promise<void> {
  await page.waitForSelector('#study')
  const modalBody = await page.$('#study')
  const frame = await modalBody.contentFrame()
  // introduction
  await Promise.all([frame.locator('text=Next →').click(), frame.waitForNavigation()])
  //await frame.locator('text=Next →').click()
  // year born
  await setBirthYear(frame, birthYear)
  // gender identity
  await setGenderChoice(frame, gender)
  // racial or ethnic background
  await setBackground(frame, racial)
  // first language
  await setLanguage(frame, language)
  // education level
  await setEducation(frame, education)
  // parents' college experience
  await setParentEducation(frame, parentsEducation)
  // employment status
  await setEmployment(frame, employment)
  // ever received free school lunches
  await setLunchStatus(frame, freeLunch)
  // current zip code
  await setZipCode(frame, zipCode)
  // completion screen
  await page.click('.navbar a', { force: true })
}

function randomChoice(list: ElementHandle[]): ElementHandle {
  const option = Math.floor(Math.random() * list.length)
  return list[option]
}

function sleep(seconds = 1.0): Promise<unknown> {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000)
  })
}

export { closeExtras, generalDemographicSurvey, randomChoice, sleep }
