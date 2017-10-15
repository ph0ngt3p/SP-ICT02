'use strict'

const mongoose = require('mongoose')

const wearSchema = new mongoose.Schema({
    id : String,
    name : String,
    color : String,
    size : String,
    quantity : Number,
    detail : String,
    image : String
})

module.exports = wearSchema
