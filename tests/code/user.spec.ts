import { Student } from '../../src/utilities/user'
import { expect, test } from '@playwright/test'

test('generate new student information to use with Accounts', async () => {
  const defaultDomain = 'restmail.net'
  const student = new Student()
  const username = `${student.first}.${student.last}.${student.id}`.toLowerCase()
  expect(student.first.length).toBeGreaterThan(0)
  expect(student.last.length).toBeGreaterThan(0)
  expect(student.id).toHaveLength(5)
  expect(student.username.length).toBeGreaterThanOrEqual(9)
  expect(student.username).toBe(username)
  expect(student.email.length).toBeGreaterThanOrEqual(10 + defaultDomain.length)
  expect(student.email).toBe(`${username}@${defaultDomain}`)
  expect(student.password).toHaveLength(12)
})

test('generate new student information to use with Accounts and log it', async () => {
  const otherDomain = 'other.main.service'
  const student = new Student(otherDomain, true)
  const username = `${student.first}.${student.last}.${student.id}`.toLowerCase()
  expect(student.first.length).toBeGreaterThan(0)
  expect(student.last.length).toBeGreaterThan(0)
  expect(student.id).toHaveLength(5)
  expect(student.username.length).toBeGreaterThanOrEqual(9)
  expect(student.username).toBe(username)
  expect(student.email.length).toBeGreaterThanOrEqual(10 + otherDomain.length)
  expect(student.email).toBe(`${username}@${otherDomain}`)
  expect(student.password).toHaveLength(12)
})
