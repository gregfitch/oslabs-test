import { performance } from 'perf_hooks'
import { expect } from '@playwright/test'
import test from '../../src/fixtures/base'
import { closeExtras, randomChoice, sleep } from '../../src/utilities/utilities'
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
  const notice = await page.$$('.cookie-notice, .put-away, ._pi_closeButton')
  expect(notice).toHaveLength(0)
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
