import { Page } from '@playwright/test'

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

async function setBirthYear(page: Page, frameUrl: string, birthYear = ''): Promise<void> {
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
  await page.frame({ url: frameUrl }).fill('input[name^=QR~]', year)
  await page.frame({ url: frameUrl }).click('text=Next →')
}

async function setGenderChoice(page: Page, frameUrl: string, gender = ''): Promise<void> {
  let genderChoice = gender
  if (!genderOptions.includes(gender)) {
    const use = Math.floor(Math.random() * genderOptions.length)
    genderChoice = genderOptions[use]
  }
  await page.frame({ url: frameUrl }).click(`label:has-text=${genderChoice}`)
  await page.frame({ url: frameUrl }).click('text=Next →')
}

async function setBackground(page: Page, frameUrl: string, racial = ''): Promise<void> {
  let background = racial
  if (!backgrounds.includes(racial)) {
    const use = Math.floor(Math.random() * backgrounds.length)
    background = backgrounds[use]
  }
  await page.frame({ url: frameUrl }).click(`label:has-text=${background}`)
  await page.frame({ url: frameUrl }).click('text=Next →')
}

async function setLanguage(page: Page, frameUrl: string, language = ''): Promise<void> {
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
  await page.frame({ url: frameUrl }).click(`label:has-text=${firstLanguage}`)
  if (firstLanguage === 'Other') {
    await page.frame({ url: frameUrl }).fill('input[name^=QR~]', otherLanguage)
  }
  await page.frame({ url: frameUrl }).click('text=Next →')
}

async function setEducation(page: Page, frameUrl: string, education = ''): Promise<void> {
  let userLevel = education
  if (!educationLevels.includes(education)) {
    const use = Math.floor(Math.random() * educationLevels.length)
    userLevel = educationLevels[use]
  }
  await page.frame({ url: frameUrl }).click(`label:has-text=${userLevel}`)
  await page.frame({ url: frameUrl }).click('text=Next →')
}

async function setParentEducation(page: Page, frameUrl: string, parentsEducation = ''): Promise<void> {
  let parentLevel = parentsEducation
  if (!collegeParents.includes(parentsEducation)) {
    const use = Math.floor(Math.random() * collegeParents.length)
    parentLevel = collegeParents[use]
  }
  await page.frame({ url: frameUrl }).click(`label:has-text=${parentLevel}`)
  await page.frame({ url: frameUrl }).click('text=Next →')
}

async function setEmployment(page: Page, frameUrl: string, employment = ''): Promise<void> {
  let employed = employment
  if (!employmentOptions.includes(employment)) {
    employed = 'Other'
  } else {
    const use = Math.floor(Math.random() * employmentOptions.length)
    employed = collegeParents[use]
  }
  await page.frame({ url: frameUrl }).click(`label:has-text=${employed}`)
  if (employed === 'Other') {
    await page.frame({ url: frameUrl }).fill('input[name^=QR~]', employment)
  }
  await page.frame({ url: frameUrl }).click('text=Next →')
}

async function setLunchStatus(page: Page, frameUrl: string, freeLunch = ''): Promise<void> {
  let lunchChoice = freeLunch
  if (!lunchOptions.includes(lunchChoice)) {
    const use = Math.floor(Math.random() * lunchOptions.length)
    lunchChoice = lunchOptions[use]
  }
  await page.frame({ url: frameUrl }).click(`label:has-text=${lunchChoice}`)
  await page.frame({ url: frameUrl }).click('text=Next →')
}

async function setZipCode(page: Page, frameUrl: string, zipCode = ''): Promise<void> {
  let zip = '00000'
  if (zipCode) {
    zip = `${zipCode}`
  } else {
    const use = Math.floor(Math.random() * 5)
    if (use > 0) {
      zip = `${1 + Math.floor(Math.random() * 99998)}`
    }
  }
  await page.frame({ url: frameUrl }).fill('input[name^=QR~]', zip)
  await page.frame({ url: frameUrl }).click('text=Next →')
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
