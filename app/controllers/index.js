'use strict'

const Router = require('koa-router')
const home = require('./homeController')
const search = require('./searchController')
const viewWearDetails = require('./viewWearDetailsController')
const addToCart = require('./addToCartController')
const viewCart = require('./viewCartController')

const routes = new Router()

routes.get('/', home)
routes.get('/search', search)
routes.get('/item/:id', viewWearDetails)
routes.get('/add_to_cart/:id', addToCart)
routes.get('/cart', viewCart)

module.exports = routes
