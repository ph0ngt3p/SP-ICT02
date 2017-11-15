'use strict'

function checkInauthenticatedFactory () {
  return async function checkInauthenticatedMiddleware (ctx, next) {
    if (!ctx.session.user) {
      await ctx.render('errors/400', {
        error: 'You must log in first!'
      })
    } else {
      await next()
    }
  }
}

module.exports = checkInauthenticatedFactory
