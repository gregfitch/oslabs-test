/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Frame } from '@playwright/test'

const referredFrom = [
  'Teacher directed me',
  'Clicked a button on the OpenStax textbook',
  'From email',
  'From social media',
  'Heard from a friend/peer',
  'Other',
]
const genderOptions = ['Male', 'Female', 'Non-binary / third gender', 'Prefer not to say']
const backgrounds = [
  'White',
  'Black or African American',
  'American Indian or Alaska Native',
  'Asian',
  'Native Hawaiian or Pacific Islander',
  'Hispanic or Latinx',
  'Other',
  'Prefer not to say',
]
const primaryLanguages = ['English', 'Spanish', 'Prefer not to say']
const otherLanguages = [
  ['English', ''],
  ['Other', '普通话'],
  ['Other', 'हिंदी'],
  ['Spanish', ''],
  ['Other', 'español'],
  ['Other', 'français'],
  ['Other', 'عربي'],
  ['Other', 'বাংলা'],
  ['Other', 'русский'],
  ['Other', 'português'],
  ['Other', 'Indonesian'],
  ['Other', 'اردو'],
  ['Other', 'Deutsch'],
  ['Prefer not to say', ''],
]
const educationLevels = [
  'Have not completed high school',
  'High school diploma',
  'Associate’s degree or vocational certificate',
  'Bachelor’s degree',
  'Master’s degree or doctorate',
  'Prefer not to say',
]
const collegeParents = [
  'One of my parents attended college',
  'Both of my parents attended college',
  'Neither of my parents attended college',
  'Unsure',
  'Prefer not to say',
]
const employmentOptions = ['Student', 'Employed', 'Homemaker or caregiver', 'Retired', 'Prefer not to say']
const lunchOptions = ['Yes', 'No', 'Prefer not to say']

async function setReferrer(frame: Frame, from: string) {
  let referrer = from
  if (from && !referredFrom.includes(from)) {
    referrer = 'Other'
  } else if (!from) {
    const use = Math.floor(Math.random() * referredFrom.length)
    referrer = referredFrom[use]
  }
  await frame.locator(`label:has-text("${referrer}")`).click()
  if (referrer === 'Other') {
    await frame.locator('textarea[name]').fill(from ? from : referrer)
  }
  await frame.locator(`label:has-text("${referrer}")`).click()
  await frame.locator('#NextButton').click()
}

async function setBirthYear(frame: Frame, birthYear: string) {
  let year = '0000'
  if (birthYear) {
    year = `${birthYear}`
  } else {
    const use = Math.floor(Math.random() * 5)
    /* istanbul ignore else */
    if (use > 0) {
      const currentYear = new Date().getFullYear()
      year = `${currentYear - Math.floor(Math.random() * 75)}`
    }
  }
  await frame.locator('.ChoiceStructure > .InputText').fill(year)
  await frame.locator('#NextButton').click()
}

async function setGenderChoice(frame: Frame, gender: string) {
  let genderChoice = gender
  if (!genderOptions.includes(gender)) {
    const use = Math.floor(Math.random() * genderOptions.length)
    genderChoice = genderOptions[use]
  }
  const label = genderChoice === 'Male' ? '//label[span[text()="Male"]]' : `label:has-text("${genderChoice}")`
  await frame.locator(label).click()
  await frame.locator('#NextButton').click()
}

async function setBackground(frame: Frame, racial: string) {
  let background = racial
  if (!backgrounds.includes(racial)) {
    const use = Math.floor(Math.random() * backgrounds.length)
    background = backgrounds[use]
  }
  await frame.locator(`label:has-text("${background}")`).click()
  await frame.locator('#NextButton').click()
}

async function setLanguage(frame: Frame, language: string) {
  let firstLanguage = language,
    otherLanguage = language
  if (language && !primaryLanguages.includes(language)) {
    firstLanguage = 'Other'
  } else if (!language) {
    const use = Math.floor(Math.random() * otherLanguages.length)
    firstLanguage = otherLanguages[use][0]
    otherLanguage = otherLanguages[use][1]
  }
  await frame.locator(`label:has-text("${firstLanguage}")`).click()
  if (firstLanguage === 'Other') {
    await frame.locator('.TextEntryBox').fill(otherLanguage)
  }
  await frame.locator('#NextButton').click()
}

async function setEducation(frame: Frame, education: string) {
  let userLevel = education
  if (!educationLevels.includes(education)) {
    const use = Math.floor(Math.random() * educationLevels.length)
    userLevel = educationLevels[use]
  }
  await frame.locator(`label:has-text("${userLevel}")`).click()
  await frame.locator('#NextButton').click()
}

async function setParentEducation(frame: Frame, parentsEducation: string) {
  let parentLevel = parentsEducation
  if (!collegeParents.includes(parentsEducation)) {
    const use = Math.floor(Math.random() * collegeParents.length)
    parentLevel = collegeParents[use]
  }
  await frame.locator(`label:has-text("${parentLevel}")`).click()
  await frame.locator('#NextButton').click()
}

async function setEmployment(frame: Frame, employment: string) {
  let employed = employment
  /* istanbul ignore else */
  if (employment && !employmentOptions.includes(employment)) {
    employed = 'Other'
  } else if (!employment) {
    const use = Math.floor(Math.random() * employmentOptions.length)
    employed = employmentOptions[use]
  }
  await frame.locator(`label:has-text("${employed}")`).click()
  if (employed === 'Other') {
    await frame.locator('.TextEntryBox').fill(employment)
  }
  await frame.locator('#NextButton').click()
}

async function setLunchStatus(frame: Frame, freeLunch: string) {
  let lunchChoice = freeLunch
  if (!lunchOptions.includes(lunchChoice)) {
    const use = Math.floor(Math.random() * lunchOptions.length)
    lunchChoice = lunchOptions[use]
  }
  const label = lunchChoice === 'No' ? '//label[span[text()="No"]]' : `label:has-text("${lunchChoice}")`
  await frame.locator(label).click()
  await frame.locator('#NextButton').click()
}

async function setZipCode(frame: Frame, zipCode: string) {
  let zip = '00000'
  if (zipCode) {
    zip = `${zipCode}`
  } else {
    const use = Math.floor(Math.random() * 5)
    /* istanbul ignore else */
    if (use > 0) {
      zip = String(1 + Math.floor(Math.random() * 99998))
    }
  }
  await frame.locator('.InputText').fill(zip.padStart(5, '0'))
  await frame.locator('#NextButton').click()
}

export {
  setReferrer,
  setBirthYear,
  setGenderChoice,
  setBackground,
  setLanguage,
  setEducation,
  setParentEducation,
  setEmployment,
  setLunchStatus,
  setZipCode,
}
