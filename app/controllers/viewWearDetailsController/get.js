'use strict'

const logger = require('winston')
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
    logger.error('Error happened: Wrong id entered!')
    return ctx.render('404')
  }
}

module.exports = compose([
  viewWearDetails
])
