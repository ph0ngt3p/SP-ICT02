'use strict'

const mongoose = require('mongoose')
const _ = require('lodash')

const wearSchema = new mongoose.Schema({
  name: String,
  color: String,
  size: String,
  quantity: Number,
  detail: String,
  image: String
})

async function getAllItems (page) {
  const items = await this.find()
    .select('name')
    .select('price')
    .select('image')
    .lean()
    .exec()
  return {
    items: _.chunk(items, 5)[page],
    count: items.length
  }
}

async function getItemDetails (id) {
  return this.findOne({ _id: id }).exec()
}

wearSchema.static({
  getAllItems,
  getItemDetails
})

module.exports = wearSchema
