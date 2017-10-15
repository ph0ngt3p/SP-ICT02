'use strict'

const Router = require('koa-router')
const home = require('./homeController')

const routes = new Router()

routes.get('/', home)

module.exports = routes
