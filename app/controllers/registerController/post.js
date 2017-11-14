'use strict'

const joi = require('joi')
const compose = require('koa-compose')
const { validator, hashPassword } = require('../../middleware')
// const { Users } = require('../../models/mongoose')
// const { hashPassword } = require('../../helpers')

const bodySchema = joi.object({
  username: joi.string().required(),
  password: joi.string().required()
}).unknown().required()

async function register (ctx) {
  const { username, password } = ctx.request.body
  ctx.body = { username, password }
}

module.exports = compose([
  validator({
    body: bodySchema
  }),
  hashPassword(10),
  register
])
