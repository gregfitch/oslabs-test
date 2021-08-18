# oslabs-test
Automated testing for OpenStax Labs

![Labs Tests](https://github.com/gregfitch/oslabs-test/actions/workflows/test.yml/badge.svg) [![Coverage Status](https://coveralls.io/repos/github/gregfitch/oslabs-test/badge.svg?branch=main)](https://coveralls.io/github/gregfitch/oslabs-test?branch=main)
# Run the tests
---
### Install Git and NPM
`sudo apt install git`
`sudo apt install npm`
### Clone the test repo
`git clone https://github.com/gregfitch/oslabs-test`
`cd oslabs-test`
### Install dependencies
`npx playwright install-deps` (*may be skipped if running Chromium and/or Firefox on Linux; required for Webkit*)
### Check the code and verify the Dev environment is up

`npm run coverage` (*may be skipped*)
### Run the tests
`npm run test`

---
# Command line options
Run against another instance set (expected options: `dev`, `qa`, `staging`, `prod`)
`INSTANCE=qa npm run test`

Run against a specific Accounts or Website URL
`ACCOUNTS_BASE_URL=https://accounts-temp-instance.openstax.org npm run test`
`WEB_BASE_URL=https://temp-instance.openstax.org npm run test`