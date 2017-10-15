'use strict'

const Router = require('koa-router')
const home = require('./homeController')
const wearDetails = require('./wearDetailsController')

const routes = new Router()

routes.get('/', home)
routes.get('/item/:id', wearDetails)

module.exports = routes
