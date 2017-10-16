'use strict'

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

async function getAllItemsByPage (page) {
  return this.find()
    .skip(page * 8)
    .limit(8)
    .select('name')
    .select('price')
    .select('image')
    .lean()
    .exec()
}

async function getTotalNumberOfItems () {
  return this.find().count().exec()
}

async function getItemDetails (id) {
  return this.findOne({ _id: id }).exec()
}

async function getSearchItem (name) {
  const upperCaseName = name.toUpperCase()
  return this.find({ name: new RegExp(`^${upperCaseName}.+`, 'i') }).lean().exec()
}

wearSchema.static({
  getAllItemsByPage,
  getItemDetails,
  getTotalNumberOfItems,
  getSearchItem
})

module.exports = wearSchema
