'use strict'

// the S in S.O.L.I.D: every controller only have one job, which is rendering the corresponding page with data

const Router = require('koa-router')
const home = require('./homeController')
const search = require('./searchController')
const viewWearDetails = require('./viewWearDetailsController')
const editCart = require('./editCartController')
const viewCart = require('./viewCartController')
const register = require('./registerController')
const login = require('./loginController')
const logout = require('./logoutController')

const routes = new Router()

routes.get('/', home.get)
routes.get('/search', search.get)
routes.get('/item/:id', viewWearDetails.get)
routes.get('/cart/add/:id', editCart.add.get)
routes.get('/cart/remove/:id', editCart.remove.get)
routes.get('/cart', viewCart.get)
routes.get('/register', register.get)
routes.post('/register', register.post)
routes.get('/login', login.get)
routes.post('/login', login.post)
routes.get('/logout', logout.get)

module.exports = routes
