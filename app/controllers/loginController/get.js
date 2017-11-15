'use strict'

const compose = require('koa-compose')

async function loginPage (ctx) {
  return ctx.render('login')
}

module.exports = compose([
  loginPage
])
