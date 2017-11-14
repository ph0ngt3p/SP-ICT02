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

async function comparePassword (password) {
  return bcrypt.compare(password, this.password)
}

userSchema.method({
  comparePassword
})

module.exports = mongoose.model('Users', userSchema, 'Users')
