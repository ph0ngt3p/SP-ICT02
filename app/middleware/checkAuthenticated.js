'use strict'

function checkAuthenticatedFactory () {
  return async function checkAuthenticatedMiddleware (ctx, next) {
    if (ctx.session.user) {
      await ctx.render('errors/400', {
        error: 'You have already logged in!'
      })
    } else {
      await next()
    }
  }
}

module.exports = checkAuthenticatedFactory
