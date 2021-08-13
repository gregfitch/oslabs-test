import { performance } from 'perf_hooks'
import { expect, test } from '@playwright/test'
import { sleep } from '../../src/utilities/utilities'

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
