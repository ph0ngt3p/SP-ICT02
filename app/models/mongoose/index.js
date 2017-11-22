'use strict'

const mongoose = require('mongoose')
const logger = require('winston')
const config = require('../../config')
const Users = require('./Users')
const Wears = require('./Wears')
const Cart = require('./Cart')

mongoose.Promise = global.Promise

mongoose.connect(`${config.mongodb.uri}`, {
  useMongoClient: true
}).then(() => logger.info('Successfully connected to database!'))
  .catch((e) => logger.error(e))

module.exports = {
  Users,
  Wears,
  Cart
}
