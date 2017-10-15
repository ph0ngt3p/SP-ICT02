'use strict'

const mongoose = require('mongoose')

const wearSchema = new mongoose.Schema({
  name: String,
  color: String,
  size: String,
  quantity: Number,
  detail: String,
  image: String
})

async function getAllItemsByPage (page) {
  return this.find()
    .skip(page * 5)
    .limit(5)
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

wearSchema.static({
  getAllItemsByPage,
  getItemDetails,
  getTotalNumberOfItems
})

module.exports = wearSchema
