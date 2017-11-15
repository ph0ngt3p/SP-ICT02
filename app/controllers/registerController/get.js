'use strict'

const compose = require('koa-compose')
const { checkAuthenticated } = require('../../middleware')

async function registerPage (ctx) {
  return ctx.render('register')
}

module.exports = compose([
  checkAuthenticated(),
  registerPage
])
