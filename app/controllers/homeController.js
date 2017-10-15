'use strict'

const compose = require('koa-compose')
const models = require('../models')

async function home (ctx) {
  const items = await models.Wears.find()
                                  .select('name')
                                  .select('price')
                                  .select('image')
                                  .lean()
                                  .exec()
  return ctx.render('home', {
    items
  })
}

module.exports = compose([
  home
])
