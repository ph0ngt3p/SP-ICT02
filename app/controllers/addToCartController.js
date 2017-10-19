'use strict'

const compose = require('koa-compose')
const models = require('../models/mongoose')

async function addToCart (ctx) {
  const { id } = ctx.params
  const cart = new models.Cart(ctx.session.cart ? ctx.session.cart : {})
  const item = await models.Wears.getItemDetails(id)
  cart.addToCart(item, id)
  ctx.session.cart = cart
  return ctx.redirect('/cart')
}

module.exports = compose([
  addToCart
])
