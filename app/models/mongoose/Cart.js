'use strict'

/* the O in SOLID: If you want to add a new feature, you can easily add in new functions without the need to modify the existing ones

   the S in S.O.L.I.D: every function in this class only have one job, which is execute a specific query to the database

   the D in SOLID - Dependence Inversion: The controller will call the methods through Mongoose instead of straight from
    the db, therefore we do not need to refactor the controller if we want to change the db */

const mongoose = require('mongoose')
const _ = require('lodash')

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  items: [{
    item: { type: mongoose.Schema.Types.ObjectId, ref: 'Wears' },
    quantity: { type: Number, default: 1 }
  }]
})

async function createNewUserCart (userId) {
  return this.create({ userId })
}

async function getCart (userId) {
  return this.findOne({ userId }).exec()
}

async function displayCart (userId) {
  const cart = await this.findOne({ userId }).populate('items.item').exec()
  const totalPrice = _.sumBy(cart.items, (cartItem) => cartItem.quantity * cartItem.item.price) || 0
  return {
    items: _.get(cart, 'items', []),
    totalPrice
  }
}

function itemInCart (itemId) {
  return _.find(this.items, { item: mongoose.Types.ObjectId(itemId) })
}

async function addNewItemToCart (itemId, quantity) {
  this.items.push({
    item: itemId,
    quantity
  })
  await this.save()
}

async function updateItemInCart (itemId, quantity) {
  this.itemInCart(itemId).quantity += quantity
  await this.save()
}

async function removeItemFromCart (itemId) {
  this.items = _.reject(this.items, this.itemInCart(itemId))
  await this.save()
}

cartSchema
  .static({
    createNewUserCart,
    getCart,
    displayCart
  })
  .method({
    itemInCart,
    addNewItemToCart,
    updateItemInCart,
    removeItemFromCart
  })

module.exports = mongoose.model('Cart', cartSchema, 'Cart')
