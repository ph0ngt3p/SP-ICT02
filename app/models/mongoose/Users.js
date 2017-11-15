'use strict'

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

async function getUserByEmail (email) {
  return this.findOne({ email }).exec()
}

async function validatePassword (password) {
  return bcrypt.compare(password, this.password)
}

userSchema.static({
  getUserByEmail
})

userSchema.method({
  validatePassword
})

module.exports = mongoose.model('Users', userSchema, 'Users')
