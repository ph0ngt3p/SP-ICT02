'use strict'

const compose = require('koa-compose')
const { checkInauthenticated } = require('../../middleware')
const { Cart } = require('../../models/mongoose')

async function viewCart (ctx) {
  const { items: cart, totalPrice } = await Cart.displayCart(ctx.session.user._id)
  return ctx.render('cart', {
    cart,
    total: totalPrice
  })
}

module.exports = compose([
  checkInauthenticated(),
  viewCart
])
