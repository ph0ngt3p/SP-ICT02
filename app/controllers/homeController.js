'use strict'

const compose = require('koa-compose')
const models = require('../models')

async function home (ctx) {
  const page = ctx.query.page ? parseInt(ctx.query.page, 10) : 0
  const { items, count } = await models.Wears.getAllItems(page)
  return ctx.render('home', {
    items,
    useRangeBasedPagination: false,
    itemCount: count,
    page,
    pages: count > 5 ? Math.ceil(count / 5) : 0
  })
}

module.exports = compose([
  home
])
