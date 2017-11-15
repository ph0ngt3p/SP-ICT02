'use strict'

const compose = require('koa-compose')
const { checkInauthenticated } = require('../../middleware')
const { Cart, Wears } = require('../../models/mongoose')

async function addToCart (ctx) {
  const { id } = ctx.params
  const cart = new Cart(ctx.session.cart ? ctx.session.cart : {})
  const item = await Wears.getItemDetails(id)
  cart.addToCart(item, id)
  ctx.session.cart = cart
  return ctx.redirect('/cart')
}

module.exports = compose([
  checkInauthenticated(),
  addToCart
])
