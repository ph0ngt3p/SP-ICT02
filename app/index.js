'use strict'

const http = require('http')
const promisify = require('util').promisify
const logger = require('winston')
const config = require('./config')
const app = require('./app')

const server = http.createServer(app.callback())

server.listen = promisify(server.listen)
server.listen(config.server.port)
  .then(() => logger.info(`App is listening on port ${config.server.port}`))
  .catch((err) => {
    logger.error('Error happened during server start', err)
    process.exit(1)
  })
