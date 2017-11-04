'use strict'

// the O in SOLID: If you want to add a new feature, you can easily add in new functions without the need to modify the existing ones

const mongoose = require('mongoose')

const wearSchema = new mongoose.Schema({
  name: { type: String, required: true },
  color: { type: String, required: true },
  size: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  detail: { type: String, required: true },
  image: { type: String, required: true }
})

// the O in SOLID: Should not modify this when introducing new features
async function getAllItemsByPage (page) {
  const [items, itemsCount] = await Promise.all([
    this.find()
        .skip(page * 9)
        .limit(9)
        .select('name')
        .select('price')
        .select('image')
        .lean()
        .exec(),
    this.getTotalNumberOfItems()
  ])
  return {
    items,
    itemsCount
  }
}

// the O in SOLID: Should not modify this when introducing new features
async function getTotalNumberOfItems () {
  return this.find().count().exec()
}

// the O in SOLID: Should not modify this when introducing new features
async function getItemDetails (id) {
  return this.findOne({ _id: id }).exec()
}

// the O in SOLID: Should not modify this when introducing new features
async function getSearchItem (keyword, page) {
  const [items, itemsCount] = await Promise.all([
    this.find({ name: new RegExp(`${keyword}`, 'i') })
        .skip(page * 6)
        .limit(6)
        .select('name')
        .select('price')
        .select('image')
        .lean()
        .exec(),
    this.find({ name: new RegExp(`${keyword}`, 'i') }).count().exec()
  ])
  return {
    items,
    itemsCount
  }
}

// the O in SOLID: there is room for extension

wearSchema.static({
  getAllItemsByPage,
  getItemDetails,
  getTotalNumberOfItems,
  getSearchItem
})

module.exports = mongoose.model('Wears', wearSchema, 'Wears')
