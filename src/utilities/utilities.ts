import { Page } from '@playwright/test'
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

async function closeExtras(page: Page): Promise<void> {
  try {
    await page.click('text=Got it!', { timeout: 3000 })
  } catch (error) {}
  try {
    await page.click('._pi_closeButton', { timeout: 3000 })
  } catch (error) {}
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
  const frame = await page.$('#study')
  const frameUrl = await frame.getAttribute('src')
  // introduction
  await page.frame({ url: frameUrl }).click('text=Next →')
  // year born
  await setBirthYear(page, frameUrl, birthYear)
  // gender identity
  await setGenderChoice(page, frameUrl, gender)
  // racial or ethnic background
  await setBackground(page, frameUrl, racial)
  // first language
  await setLanguage(page, frameUrl, language)
  // education level
  await setEducation(page, frameUrl, education)
  // parents' college experience
  await setParentEducation(page, frameUrl, parentsEducation)
  // employment status
  await setEmployment(page, frameUrl, employment)
  // ever received free school lunches
  await setLunchStatus(page, frameUrl, freeLunch)
  // current zip code
  await setZipCode(page, frameUrl, zipCode)
  // completion screen
  await page.frame({ url: frameUrl }).click('text=Return to view other studies')
}

function sleep(seconds = 1.0): Promise<unknown> {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000)
  })
}

export { closeExtras, generalDemographicSurvey, sleep }
