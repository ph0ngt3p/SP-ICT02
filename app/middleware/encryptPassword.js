'use strict'

const bcrypt = require('bcrypt')

function encryptFactory (saltRounds) {
  return async function encryptMiddleware (ctx, next) {
    const salt = await bcrypt.genSalt(saltRounds)
    ctx.request.body.password = await bcrypt.hash(ctx.request.body.password, salt)
    await next()
  }
}

module.exports = encryptFactory
