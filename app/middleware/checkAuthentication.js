'use strict'

function checkAuthenticationFactory () {
  return async function checkAuthenticationMiddleware (ctx, next) {
    if (!ctx.session.user) {
      await ctx.render('errors/400', {
        error: 'You must log in first!'
      })
    } else {
      await next()
    }
  }
}

module.exports = checkAuthenticationFactory
