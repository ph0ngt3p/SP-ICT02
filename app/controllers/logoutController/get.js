'use strict'

const compose = require('koa-compose')
const { checkInauthenticated } = require('../../middleware')

async function logout (ctx) {
  ctx.session = null
  return ctx.redirect('/')
}

module.exports = compose([
  checkInauthenticated(),
  logout
])
