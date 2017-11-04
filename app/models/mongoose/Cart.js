'use strict'

// the S in S.O.L.I.D: every function in this class only have one job, which is described in the function name

module.exports = class Cart {
  constructor (oldCart) {
    this.items = oldCart.items || {}
    this.totalPrice = oldCart.totalPrice || 0
  }

  addToCart (item, id) {
    if (!this.items[id]) {
      this.items[id] = {
        item,
        qty: 0,
        price: 0
      }
    }
    this.items[id].qty += 1
    this.items[id].price = this.items[id].item.price * this.items[id].qty
    this.totalPrice += this.items[id].item.price
  }

  removeOne (id) {
    this.items[id].qty -= 1
    this.items[id].price -= this.items[id].item.price
    this.totalPrice -= this.items[id].item.price

    if (this.items[id].qty <= 0) {
      delete this.items[id]
    }
  }

  removeItem (id) {
    this.totalPrice -= this.items[id].price
    delete this.items[id]
  }

  toArray () {
    return Object.values(this.items)
  }
}
