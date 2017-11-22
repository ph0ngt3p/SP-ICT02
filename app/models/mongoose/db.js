'use strict'

const mongoose = require('mongoose')
const logger = require('winston')
const config = require('../../config')

module.exports = function connect (options = {}) {
  mongoose.Promise = config.mongodb.promiseLibrary
  mongoose.connect(config.mongodb.uri, {
    ...config.mongodb.driverOptions,
    ...options
  })

  mongoose.connection.on('connected', () => {
    logger.info('Mongoose successfully connected to', config.mongodb.uri)
  })

  mongoose.connection.on('error', (err) => {
    logger.error(`Error happened during establishing connection to MongoDb, ${err}`)
  })

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      logger.warn('Mongoose connection is disconnected due to application termination')
      process.exit(0)
    })
  })

  return mongoose.connection
}
