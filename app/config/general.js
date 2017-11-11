'use strict'

const joi = require('joi')

const envVarsSchema = joi.object({
  TEST: joi.boolean()
    .truthy('TRUE')
    .truthy('true')
    .falsy('FALSE')
    .falsy('false')
    .default(false)
}).unknown()
  .required()

const { error, value: envVars } = joi.validate(process.env, envVarsSchema)
if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

module.exports = {
  app: {
    name: 'Selling Wears',
    version: '1.0.0'
  },
  template: {
    path: envVars.TEST ? 'test/views' : 'app/views',
    options: {
      map: { html: 'nunjucks' }
    }
  },
  staticDir: {
    root: './static',
    options: {}
  }
}
