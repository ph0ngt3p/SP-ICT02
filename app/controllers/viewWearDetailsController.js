'use strict'

const compose = require('koa-compose')
const models = require('../models/mongoose')

async function viewWearDetails (ctx) {
  const { id } = ctx.params
  const item = await models.Wears.getItemDetails(id)
  return ctx.render('item', {
    item
  })
}

module.exports = compose([
  viewWearDetails
])
