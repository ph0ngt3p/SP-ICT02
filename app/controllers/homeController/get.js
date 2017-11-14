'use strict'

const compose = require('koa-compose')
const { Wears } = require('../../models/mongoose')

async function home (ctx) {
  const page = ctx.query.page ? parseInt(ctx.query.page, 10) : 0
  const { items, itemsCount } = await Wears.getAllItemsByPage(page)
  return ctx.render('home', {
    items,
    itemsCount,
    page,
    pages: itemsCount > 9 ? Math.ceil(itemsCount / 9) : 0
  })
}

module.exports = compose([
  home
])
