'use strict'

const compose = require('koa-compose')
const models = require('../models')

async function indexPage (ctx) {
  const user = await models.Users.findOne({ name: 'tep' }).exec()
  return ctx.render('index', {
    header: 'Selling "wears"!',
    name: user.name
  })
}

module.exports = compose([
  indexPage
])
