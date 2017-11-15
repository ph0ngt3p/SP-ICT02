'use strict'

const compose = require('koa-compose')
const { checkAuthentication } = require('../../middleware')

async function logout (ctx) {
  ctx.session = {}
  return ctx.redirect('/')
}

module.exports = compose([
  checkAuthentication(),
  logout
])
