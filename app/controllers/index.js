'use strict'

const Router = require('koa-router')
const home = require('./homeController')
const wearDetails = require('./wearDetailsController')
const addToCart = require('./cartController')

const routes = new Router()

routes.get('/', home)
routes.get('/item/:id', wearDetails)
routes.get('/add_to_cart/:id', addToCart)

module.exports = routes
