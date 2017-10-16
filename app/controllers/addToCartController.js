'use strict'

const compose = require('koa-compose')
const models = require('../models')

async function addToCart (ctx) {
  const { id } = ctx.params
  const cart = new models.Cart(ctx.session.cart ? ctx.session.cart : {})
  const item = await models.Wears.getItemDetails(id)
  cart.addToCart(item, id)
  ctx.session.cart = cart
  return ctx.redirect('/')
}

module.exports = compose([
  addToCart
])