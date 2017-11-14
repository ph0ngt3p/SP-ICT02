'use strict'

const joi = require('joi')

function validatorFactory (schemas) {
  return async function validatorMiddleware (ctx, next) {
    try {
      ['params', 'query'].forEach((partToValidate) => {
        if (schemas[partToValidate]) {
          const validatedObject = joiValidate(ctx[partToValidate], schemas[partToValidate])
          Object.assign(ctx[partToValidate], validatedObject)
        }
      })
      if (schemas.body) {
        ctx.request.body = joiValidate(ctx.request.body, schemas.body)
      }
      await next()
    } catch (error) {
      await ctx.render(ctx.path.replace('/', ''), {
        error
      })
    }
  }
}

function joiValidate (props, schema, options) {
  const { error, value } = joi.validate(props, schema, options)
  if (error) {
    throw error
  }
  return value
}

module.exports = validatorFactory
