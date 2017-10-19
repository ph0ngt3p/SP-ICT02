'use strict'

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: { type: String, default: '' }
})

module.exports = mongoose.model('Users', userSchema, 'Users')
