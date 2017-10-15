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

module.exports = wearSchema
