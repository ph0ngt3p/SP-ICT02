'use strict'

const compose = require('koa-compose')
const { checkAuthenticated } = require('../../middleware')

async function loginPage (ctx) {
  return ctx.render('login')
}

module.exports = compose([
  checkAuthenticated(),
  loginPage
])
