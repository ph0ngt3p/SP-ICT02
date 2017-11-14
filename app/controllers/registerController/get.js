'use strict'

const compose = require('koa-compose')

async function registerPage (ctx) {
  return ctx.render('register')
}

module.exports = compose([
  registerPage
])
