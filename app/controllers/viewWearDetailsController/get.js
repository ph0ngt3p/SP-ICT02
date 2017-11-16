'use strict'

const compose = require('koa-compose')
const { Wears } = require('../../models/mongoose')

async function viewWearDetails (ctx) {
  const { id } = ctx.params
  try {
    const item = await Wears.getItemDetails(id)
    return ctx.render('item', {
      item
    })
  } catch (e) {
    return ctx.render('errors/404')
  }
}

module.exports = compose([
  viewWearDetails
])
