'use strict'

/* the O in SOLID: If you want to add new feature, you can easily add in new functions without the need to modify the existing ones

   the S in S.O.L.I.D: every function in this class only have one job, which is described in the function name */

module.exports = class Cart {
  constructor (oldCart) {
    this.items = oldCart.items || {}
    this.totalPrice = oldCart.totalPrice || 0
  }

  // the O in SOLID: Should not modify this when introducing new features
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

  // the O in SOLID: Should not modify this when introducing new features
  removeOne (id) {
    this.items[id].qty -= 1
    this.items[id].price -= this.items[id].item.price
    this.totalPrice -= this.items[id].item.price

    if (this.items[id].qty <= 0) {
      delete this.items[id]
    }
  }

  // the O in SOLID: Should not modify this when introducing new features
  removeItem (id) {
    this.totalPrice -= this.items[id].price
    delete this.items[id]
  }

  toArray () {
    return Object.values(this.items)
  }

  // the O in SOLID: there is room for extension
}
