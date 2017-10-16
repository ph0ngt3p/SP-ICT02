'use strict'

const compose = require('koa-compose')
const models = require('../models')

async function search (ctx) {
  const searchStr = ctx.query.query
  const items = await models.Wears.getSearchItem(searchStr)
  const itemsCount = items.length
  const page = ctx.query.page ? parseInt(ctx.query.page, 10) : 0

  return ctx.render('search', {
    items: items.slice(6 * page, 6 * (page + 1)),
    queryString: searchStr,
    itemsCount,
    page,
    pages: itemsCount > 6 ? Math.ceil(itemsCount / 6) : 0
  })
}

module.exports = compose([
  search
])
