'use strict'

const compose = require('koa-compose')
const models = require('../../models/mongoose')

async function search (ctx) {
  const searchStr = ctx.query.query
  const page = ctx.query.page ? parseInt(ctx.query.page, 10) : 0
  const { items, itemsCount } = await models.Wears.getSearchItem(searchStr, page)
  return ctx.render('search', {
    items,
    queryString: searchStr,
    itemsCount,
    page,
    pages: itemsCount > 6 ? Math.ceil(itemsCount / 6) : 0
  })
}

module.exports = compose([
  search
])
