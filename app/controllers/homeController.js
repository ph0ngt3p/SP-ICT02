'use strict'

const compose = require('koa-compose')
const models = require('../models')

async function home (ctx) {
  const page = ctx.query.page ? parseInt(ctx.query.page, 10) : 0
  const items = await models.Wears.getAllItemsByPage(page)
  const itemsCount = await models.Wears.getTotalNumberOfItems()
  return ctx.render('home', {
    items,
    useRangeBasedPagination: false,
    itemCount: itemsCount,
    page,
    pages: itemsCount > 8 ? Math.ceil(itemsCount / 8) : 0
  })
}

module.exports = compose([
  home
])
