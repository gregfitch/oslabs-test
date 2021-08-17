import faker from 'faker'
import { Page } from '@playwright/test'
import { checkRestmail, getPin } from './restmail'

class Student {
  first: string
  last: string
  id: string
  username: string
  email: string
  password: string

  constructor(domain = 'restmail.net', log = false) {
    this.first = faker.name.firstName()
    this.last = faker.name.lastName()
    this.id = this.genRandomHex(5)
    this.username = `${this.first}.${this.last}.${this.id}`.toLowerCase()
    this.email = `${this.username}@${domain}`
    this.password = this.genRandomHex(12)
    if (log) {
      console.log(`User: ${this.first} ${this.last} ${this.email} ${this.password}`)
    }
  }

  private genRandomHex = (size) => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')
}

async function accountsUserSignup(page: Page, url: string, student: Student = new Student()): Promise<Student> {
  if (url) await page.goto(url)
  await page.click('text=Sign up')
  await page.click('text=Student')
  await page.fill('[placeholder="First name"]', student.first)
  await page.fill('[placeholder="Last name"]', student.last)
  await page.fill('[placeholder="me@myemail.com"]', student.email)
  await page.fill('[placeholder="Password"]', student.password)
  await page.check('#signup_terms_accepted')
  await page.click('text=Continue')
  const messages = await checkRestmail(student.username)
  const pin = getPin(messages.pop())
  await page.fill('[placeholder="Enter 6-digit PIN here"]', pin)
  await page.click('text=Confirm my account')
  await page.click('text=Finish')
  return student
}

async function rexUserSignup(page: Page, url: string, student: Student = new Student()): Promise<Student> {
  if (url) {
    await page.goto(url)
  }
  await page.click('[data-testid="nav-login"]')
  return accountsUserSignup(page, null, student)
}

async function webUserSignup(page: Page, url: string, student: Student = new Student()): Promise<Student> {
  if (url) {
    await page.goto(url)
  }
  await Promise.all([page.waitForNavigation(), page.click('text=Log in')])
  return accountsUserSignup(page, null, student)
}

export { Student, accountsUserSignup, rexUserSignup, webUserSignup }
