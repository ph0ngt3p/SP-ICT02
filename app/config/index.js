'use strict'

require('dotenv').config({ silent: true })
const logger = require('./logger')
const mongodb = require('./mongodb')
const server = require('./server')
const general = require('./general')

module.exports = {
  ...server,
  ...general,
  ...mongodb,
  ...logger
}
