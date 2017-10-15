'use strict'

const mongoose = require('mongoose')
const logger = require('winston')
const config = require('../config')
const userSchema = require('./Users')

mongoose.Promise = global.Promise

mongoose.connect(`${config.mongodb.uri}`, {
  useMongoClient: true
}).then(() => logger.info('Successfully connected to database!'))
  .catch((e) => logger.error(e))

const models = {
  Users: mongoose.model('Users', userSchema, 'Users')
}

module.exports = models
