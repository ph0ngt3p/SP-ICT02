'use strict'

const compose = require('koa-compose')
const models = require('../models')

async function addToCart (ctx) {
  const { id } = ctx.params
  const cart = new models.Cart(ctx.session.cart ? ctx.session.cart : {
    data: {
      item: [],
      totals: 0
    }
  })
  const item = await models.Wears.getItemDetails(id)
  cart.addToCart(item, 1)
  ctx.session.cart = cart
  return ctx.render('cart', {
    cart
  })
}

module.exports = compose([
  addToCart
])
