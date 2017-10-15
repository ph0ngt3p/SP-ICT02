'use strict'

const Router = require('koa-router')
const indexPage = require('./indexPage')

const routes = new Router()

routes.get('/', indexPage)

module.exports = routes
