'use strict'

// the S in S.O.L.I.D: every function in this class only have one job, which is execute a specific query to the database

const mongoose = require('mongoose')

/* D in SOLID - Dependence Inversion: The controller will call the methods through Mongoose instead of straight from
   the db, therefore we do not need to refactor the controller if we want to change the db */

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

async function getTotalNumberOfItems () {
  return this.find().count().exec()
}

async function getItemDetails (id) {
  return this.findOne({ _id: id }).exec()
}

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

wearSchema.static({
  getAllItemsByPage,
  getItemDetails,
  getTotalNumberOfItems,
  getSearchItem
})

module.exports = mongoose.model('Wears', wearSchema, 'Wears')
