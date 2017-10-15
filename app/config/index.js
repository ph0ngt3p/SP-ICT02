'use strict'

require('dotenv').config({ silent: true })
const logger = require('./logger')
const mongodb = require('./mongodb')
const server = require('./server')
const general = require('./general')

module.exports = Object.assign({}, general, server, logger, mongodb)
