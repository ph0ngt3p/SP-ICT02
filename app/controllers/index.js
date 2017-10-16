'use strict'

const Router = require('koa-router')
const home = require('./homeController')
const wearDetails = require('./wearDetailsController')
const search = require('./searchController')

const routes = new Router()

routes.get('/', home)
routes.get('/item/:id', wearDetails)
routes.get('/search', search)

module.exports = routes
