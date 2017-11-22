'use strict'

const joi = require('joi')

const envVarsSchema = joi.object({
  MONGODB_URI: joi.string()
    .uri({ scheme: 'mongodb' }),
  MONGODB_HOST: joi.string(),
  MONGODB_PORT: joi.number().default(27017),
  MONGODB_USERNAME: joi.string(),
  MONGODB_PASSWORD: joi.string().default(''),
  MONGODB_DATABASE: joi.string().default('Wears')
}).xor('MONGODB_URI', 'MONGODB_HOST')
  .with('MONGODB_HOST', ['MONGODB_PORT', 'MONGODB_PASSWORD', 'MONGODB_USERNAME'])
  .unknown()
  .required()

const { error, value: envVars } = joi.validate(process.env, envVarsSchema)
if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

const { MONGODB_URI, MONGODB_HOST, MONGODB_PORT, MONGODB_PASSWORD, MONGODB_USERNAME, MONGODB_DATABASE } = envVars

const config = {
  mongodb: {
    uri: MONGODB_URI || `mongodb://${(MONGODB_PASSWORD && MONGODB_USERNAME) ? `${MONGODB_USERNAME}:${MONGODB_PASSWORD}` : ''}@${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DATABASE}`,
    promiseLibrary: global.Promise,
    driverOptions: {
      useMongoClient: true,
      w: 1,
      j: true
    }
  }
}

module.exports = config
