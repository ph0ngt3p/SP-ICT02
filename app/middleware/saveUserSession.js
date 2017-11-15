'use strict'

function saveUserSessionFactory () {
  return async function saveUserSessionMiddleware (ctx, next) {
    ctx.state.session = ctx.session
    await next()
  }
}

module.exports = saveUserSessionFactory
