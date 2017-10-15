'use strict'

module.exports = class Cart {
  constructor () {
    this.items = []
    this.totals = 0
  }

  inCart (productID) {
    let found = false
    this.items.forEach((item) => {
      if (item.id === productID) {
        found = true
      }
    })
    return found
  }

  addToCart (product, qty) {
    if (!this.inCart(product._id)) {
      const prod = {
        id: product._id,
        name: product.name,
        price: product.price,
        qty,
        image: product.image
      }
      this.items.push(prod)
      this.calculateTotals()
    } else {
      const item = this.items.filter((item) => item._id === product._id)
      item.qty += 1
    }
  }

  calculateTotals () {
    this.totals = 0
    this.items.forEach((item) => {
      const price = item.price
      const qty = item.qty
      const amount = price * qty
      this.data.totals += amount
    })
  }
}
