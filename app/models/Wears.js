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
  return {
    items: await this
                  .find()
                  .skip(page * 9)
                  .limit(9)
                  .select('name')
                  .select('price')
                  .select('image')
                  .lean()
                  .exec(),
    itemsCount: await this.getTotalNumberOfItems()
  }
}

async function getTotalNumberOfItems () {
  return this.find().count().exec()
}

async function getItemDetails (id) {
  return this.findOne({ _id: id }).exec()
}

async function getSearchItem (name, page) {
  const upperCaseName = name.toUpperCase()
  const itemsCount = await this.find({ name: new RegExp(`^${upperCaseName}.+`, 'i') }).count().exec()
  return {
    items: await this
                  .find({ name: new RegExp(`^${upperCaseName}.+`, 'i') })
                  .skip(page * 6)
                  .limit(6)
                  .select('name')
                  .select('price')
                  .select('image')
                  .lean()
                  .exec(),
    itemsCount
  }
}

wearSchema.static({
  getAllItemsByPage,
  getItemDetails,
  getTotalNumberOfItems,
  getSearchItem
})

module.exports = wearSchema
