'use strict'

const compose = require('koa-compose')
const { checkAuthentication } = require('../../middleware')
const { Cart } = require('../../models/mongoose')

async function viewCart (ctx) {
  if (!ctx.session.cart) {
    return ctx.render('cart', {
      cart: [],
      total: 0
    })
  }
  const cart = new Cart(ctx.session.cart)
  return ctx.render('cart', {
    cart: cart.toArray(),
    total: cart.totalPrice
  })
}

module.exports = compose([
  checkAuthentication(),
  viewCart
])
