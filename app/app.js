'use strict'

const Koa = require('koa')
const Boom = require('boom')
const cors = require('kcors')
const bodyParser = require('koa-bodyparser')
const serve = require('koa-static')
const views = require('koa-views')
const session = require('koa-session')
const nunjucks = require('nunjucks')
const middleware = require('./middleware')
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
app.use(cors())
app.use(middleware.parseQuery({ allowDots: true }))
app.use(bodyParser())
app.use(controllers.routes())
app.use(controllers.allowedMethods({
  throw: true,
  notImplemented: () => new Boom.notImplemented(),    // eslint-disable-line new-cap
  methodNotAllowed: () => new Boom.methodNotAllowed() // eslint-disable-line new-cap
}))

nunjucks.configure(config.template.path, {
  autoescape: true
})

module.exports = app
