import { PlaywrightTestConfig } from '@playwright/test'
import { devices } from 'playwright'

const BASE_URL = process.env.URL

const config: PlaywrightTestConfig = {
  projects: [
    {
      name: 'Desktop Chrome',
      use: {
        browserName: 'chromium',
      },
    },
    {
      name: 'Desktop Firefox',
      use: {
        browserName: 'firefox',
      },
    },
    {
      name: 'Desktop Safari',
      use: {
        browserName: 'webkit',
      },
    },
    {
      name: 'Mobile (Pixel 5)',
      use: {
        browserName: 'chromium',
        ...devices['Pixel 5'],
      },
    },
    {
      name: 'Mobile (iPhone 12)',
      use: {
        browserName: 'webkit',
        ...devices['iPhone 12'],
      },
    },
  ],
  reporter: 'list',
  retries: 1,
  use: {
    baseURL: BASE_URL ? BASE_URL : 'https://dev.openstax.org',
    trace: 'on-first-retry',
  },
}

export default config
