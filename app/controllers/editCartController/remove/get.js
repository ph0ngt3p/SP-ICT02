'use strict'

const joi = require('joi')
const compose = require('koa-compose')
const { checkInauthenticated, validator } = require('../../../middleware')
const { Cart } = require('../../../models/mongoose')

const paramsSchema = joi.object({
  id: joi.string().hex()
    .required()
}).unknown()

async function removeFromCart (ctx) {
  const { id } = ctx.params
  const cart = await Cart.getCart(ctx.session.user._id)
  await cart.removeItemFromCart(id)
  return ctx.redirect('/cart')
}

module.exports = compose([
  checkInauthenticated(),
  validator({
    params: paramsSchema
  }),
  removeFromCart
])
