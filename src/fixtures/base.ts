/* istanbul ignore file */
import { test as base } from '@playwright/test'

type BaseURL = {
  accountsBaseURL: string
  webBaseURL: string
}

const INSTANCE = process.env.INSTANCE
const ACCOUNTS = process.env.ACCOUNTS_BASE_URL
const WEB = process.env.WEB_BASE_URL
const production = ['prod', 'Prod', 'production', 'Production']

const test = base.extend<BaseURL>({
  accountsBaseURL: async ({}, use) => {
    if (INSTANCE) {
      if (production.includes(INSTANCE)) {
        await use(`https://accounts.openstax.org`)
      } else {
        await use(`https://accounts-${INSTANCE}.openstax.org`)
      }
    } else if (ACCOUNTS) {
      await use(ACCOUNTS.endsWith('/') ? ACCOUNTS.slice(0, ACCOUNTS.length - 1) : ACCOUNTS)
    } else {
      await use('https://accounts-dev.openstax.org')
    }
  },
  webBaseURL: async ({}, use) => {
    if (INSTANCE) {
      if (production.includes(INSTANCE)) {
        await use(`https://openstax.org`)
      } else {
        await use(`https://${INSTANCE}.openstax.org`)
      }
    } else if (WEB) {
      await use(WEB.endsWith('/') ? WEB.slice(0, WEB.length - 1) : WEB)
    } else {
      await use('https://dev.openstax.org')
    }
  },
})

export default test
