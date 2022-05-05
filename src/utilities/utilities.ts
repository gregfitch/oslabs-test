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
  setReferrer,
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
  try {
    await page.click('.ReactModalPortal .put-away', { timeout: 500 })
  } catch (error) {}
  const extras = await page.isVisible(
    '.cookie-notice button, lower-sticky-note-content > .put-away, ._pi_closeButton, .ReactModalPortal .put-away',
  )
  /* istanbul ignore if */
  if (retries > 0 && extras) {
    await sleep(1)
    return await closeExtras(page, retries - 1)
  }
}

async function generalDemographicSurvey(
  page: Page,
  from = '',
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
  await frame.locator('#NextButton').click()
  // referred from
  await setReferrer(frame, from)
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
  for (let reload = 0; reload < 4; reload++) {
    try {
      await page.waitForSelector('#study', { timeout: 500 })
      const modal = await page.$('#study')
      const newFrame = await modal.contentFrame()
      await newFrame.click('.btn-primary', { timeout: 500 })
      break
    } catch (error) {}
  }
  await sleep()
}

function randomChoice(list: ElementHandle[]): ElementHandle {
  const option = Math.floor(Math.random() * list.length)
  return list[option]
}

async function sleep(seconds = 1.0): Promise<unknown> {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000)
  })
}

export { closeExtras, generalDemographicSurvey, randomChoice, sleep }
