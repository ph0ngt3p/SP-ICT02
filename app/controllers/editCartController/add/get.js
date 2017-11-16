'use strict'

const joi = require('joi')
const compose = require('koa-compose')
const { checkInauthenticated, validator } = require('../../../middleware')
const { Cart } = require('../../../models/mongoose')

const paramsSchema = joi.object({
  id: joi.string().hex()
    .required()
}).unknown()

const querySchema = joi.object({
  quantity: joi.number().default(1)
}).unknown()
  .required()

async function addToCart (ctx) {
  const { id } = ctx.params
  const { quantity } = ctx.query
  const cart = await Cart.getCart(ctx.session.user._id)
  if (!cart.itemInCart(id)) {
    await cart.addNewItemToCart(id)
  } else {
    await cart.updateItemInCart(id, quantity)
  }
  return ctx.redirect('/cart')
}

module.exports = compose([
  checkInauthenticated(),
  validator({
    params: paramsSchema,
    query: querySchema
  }),
  addToCart
])
