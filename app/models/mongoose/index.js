'use strict'

const connect = require('./db')
const Users = require('./Users')
const Wears = require('./Wears')
const Cart = require('./Cart')

module.exports = {
  connect,
  Users,
  Wears,
  Cart
}
