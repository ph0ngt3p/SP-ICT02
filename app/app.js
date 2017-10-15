'use strict'

const Koa = require('koa')
const Boom = require('boom')
const cors = require('kcors')
const serve = require('koa-static')
const views = require('koa-views')
const session = require('koa-session')
const controllers = require('./controllers')
const config = require('./config')

const app = new Koa()

app.keys = ['searekt']

const sessionConfig = {
  key: 'koa:sess',
  maxAge: 86400000,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: false
}

app.use(session(sessionConfig, app))
app.use(serve(config.staticDir.root, config.staticDir.options))
app.use(views(config.template.path, config.template.options))
app.use(controllers.routes())
app.use(controllers.allowedMethods({
  throw: true,
  notImplemented: () => new Boom.notImplemented(),    // eslint-disable-line new-cap
  methodNotAllowed: () => new Boom.methodNotAllowed() // eslint-disable-line new-cap
}))
app.use(cors())

module.exports = app
