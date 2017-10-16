'use strict'

module.exports = class Cart {
  constructor (oldCart) {
    this.data = {
      items: oldCart.data.items || [],
      totals: oldCart.data.totals || 0
    }
  }

  inCart (productID) {
    let found = false
    this.data.items.forEach((item) => {
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
        price: parseInt(product.price, 10),
        qty,
        image: product.image
      }
      this.data.items.push(prod)
      this.calculateTotals()
    } else {
      const item = this.data.items.filter((item) => item.id === product._id)
      item.qty += 1
    }
  }

  calculateTotals () {
    this.data.totals = 0
    this.data.items.forEach((item) => {
      const price = item.price
      const qty = item.qty
      const amount = price * qty
      this.data.totals += amount
    })
  }
}
