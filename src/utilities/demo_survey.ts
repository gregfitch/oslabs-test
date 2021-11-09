import { Frame } from '@playwright/test'

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
  'English',
  '普通话',
  'हिंदी',
  'Spanish',
  'español',
  'français',
  'عربي',
  'বাংলা',
  'русский',
  'português',
  'Indonesian',
  'اردو',
  'Deutsch',
  'Prefer not to say',
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

async function setBirthYear(frame: Frame, birthYear = ''): Promise<void> {
  let year = '0000'
  if (birthYear) {
    year = `${birthYear}`
  } else {
    const use = Math.floor(Math.random() * 5)
    if (use > 0) {
      const currentYear = new Date().getFullYear()
      year = `${currentYear - Math.floor(Math.random() * 75)}`
    }
  }
  await frame.locator('input[name^="QR~"]').fill(year)
  await frame.locator('text=Next →').click()
}

async function setGenderChoice(frame: Frame, gender = ''): Promise<void> {
  let genderChoice = gender
  if (!genderOptions.includes(gender)) {
    const use = Math.floor(Math.random() * genderOptions.length)
    genderChoice = genderOptions[use]
  }
  const label = genderChoice === 'Male' ? '//label[span[text()="Male"]]' : `label:has-text("${genderChoice}")`
  await frame.locator(label).click()
  await frame.locator('text=Next →').click()
}

async function setBackground(frame: Frame, racial = ''): Promise<void> {
  let background = racial
  if (!backgrounds.includes(racial)) {
    const use = Math.floor(Math.random() * backgrounds.length)
    background = backgrounds[use]
  }
  await frame.locator(`label:has-text("${background}")`).click()
  await frame.locator('text=Next →').click()
}

async function setLanguage(frame: Frame, language = ''): Promise<void> {
  let firstLanguage = language,
    otherLanguage = language
  if (!primaryLanguages.includes(language)) {
    firstLanguage = 'Other'
  } else {
    const use = Math.floor(Math.random() * otherLanguages.length)
    firstLanguage = otherLanguages[use]
    if (!primaryLanguages.includes(firstLanguage)) {
      otherLanguage = firstLanguage
      firstLanguage = 'Other'
    }
  }
  await frame.locator(`label:has-text("${firstLanguage}")`).click()
  if (firstLanguage === 'Other') {
    await frame.locator('.TextEntryBox').fill(otherLanguage)
  }
  await frame.locator('text=Next →').click()
}

async function setEducation(frame: Frame, education = ''): Promise<void> {
  let userLevel = education
  if (!educationLevels.includes(education)) {
    const use = Math.floor(Math.random() * educationLevels.length)
    userLevel = educationLevels[use]
  }
  await frame.locator(`label:has-text("${userLevel}")`).click()
  await frame.locator('text=Next →').click()
}

async function setParentEducation(frame: Frame, parentsEducation = ''): Promise<void> {
  let parentLevel = parentsEducation
  if (!collegeParents.includes(parentsEducation)) {
    const use = Math.floor(Math.random() * collegeParents.length)
    parentLevel = collegeParents[use]
  }
  await frame.locator(`label:has-text("${parentLevel}")`).click()
  await frame.locator('text=Next →').click()
}

async function setEmployment(frame: Frame, employment = ''): Promise<void> {
  let employed = employment
  if (!employmentOptions.includes(employment)) {
    employed = 'Other'
  } else {
    const use = Math.floor(Math.random() * employmentOptions.length)
    employed = collegeParents[use]
  }
  await frame.locator(`label:has-text("${employed}")`).click()
  if (employed === 'Other') {
    await frame.locator('.TextEntryBox').fill(employment)
  }
  await frame.locator('text=Next →').click()
}

async function setLunchStatus(frame: Frame, freeLunch = ''): Promise<void> {
  let lunchChoice = freeLunch
  if (!lunchOptions.includes(lunchChoice)) {
    const use = Math.floor(Math.random() * lunchOptions.length)
    lunchChoice = lunchOptions[use]
  }
  const label = lunchChoice === 'No' ? '//label[span[text()="No"]]' : `label:has-text("${lunchChoice}")`
  await frame.locator(label).click()
  await frame.locator('text=Next →').click()
}

async function setZipCode(frame: Frame, zipCode = ''): Promise<void> {
  let zip = '00000'
  if (zipCode) {
    zip = `${zipCode}`
  } else {
    const use = Math.floor(Math.random() * 5)
    if (use > 0) {
      zip = String(1 + Math.floor(Math.random() * 99998))
    }
  }
  await frame.locator('.InputText').fill(zip.padStart(5, '0'))
  await frame.locator('text=Next →').click()
}

export {
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
