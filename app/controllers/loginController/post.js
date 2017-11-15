'use strict'

const joi = require('joi')
const compose = require('koa-compose')
const { pick } = require('lodash')
const { validator } = require('../../middleware')
const { Users } = require('../../models/mongoose')

const bodySchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required()
}).unknown().required()

async function register (ctx) {
  const { email, password } = ctx.request.body
  const user = await Users.getUserByEmail(email)
  if (!user) {
    await ctx.render('login', {
      error: 'Invalid email!'
    })
  } else {
    const validatedPassword = await user.validatePassword(password)
    if (!validatedPassword) {
      await ctx.render('login', {
        error: 'Invalid password!'
      })
    } else {
      ctx.session.user = pick(user, ['_id', 'email'])
      await ctx.redirect('/')
    }
  }
}

module.exports = compose([
  validator({
    body: bodySchema
  }),
  register
])
