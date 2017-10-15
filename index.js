/* eslint-disable global-require */

'use strict'

const logger = require('winston')
const semver = require('semver')
const pkg = require('./package.json')

// handle uncaught exception and unhandled rejection
process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception - ', err)
})
process.on('unhandledRejection', (reason, p) => {
  logger.error('Unhandled Rejection at:', p, 'reason:', reason)
})

// validate Node version requirement
const runtime = {
  expected: semver.validRange(pkg.engines.node),
  actual: semver.valid(process.version)
}
const valid = semver.satisfies(runtime.actual, runtime.expected)
if (!valid) {
  throw new Error(
    `Expected Node.js v${runtime.expected}, currently running on v${runtime.actual}. Please update or change your runtime!`
  )
}

require('./app')
