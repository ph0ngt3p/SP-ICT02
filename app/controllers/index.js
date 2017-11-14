'use strict'

// the S in S.O.L.I.D: every controller only have one job, which is rendering the corresponding page with data

const Router = require('koa-router')
const home = require('./homeController')
const search = require('./searchController')
const viewWearDetails = require('./viewWearDetailsController')
const addToCart = require('./addToCartController')
const viewCart = require('./viewCartController')
const register = require('./registerController')

const routes = new Router()

routes.get('/', home)
routes.get('/search', search)
routes.get('/item/:id', viewWearDetails)
routes.get('/add_to_cart/:id', addToCart)
routes.get('/cart', viewCart)
routes.post('/register', register)

module.exports = routes
