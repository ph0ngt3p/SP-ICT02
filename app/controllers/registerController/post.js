'use strict'

const joi = require('joi')
const compose = require('koa-compose')
const { validator, encryptPassword } = require('../../middleware')
const { Users } = require('../../models/mongoose')

const bodySchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).alphanum().required()
}).unknown().required()

async function register (ctx) {
  const { email, password } = ctx.request.body
  const checkEmailExistence = await Users.getUserByEmail(email)
  if (!checkEmailExistence) {
    const user = new Users({
      email,
      password
    })
    await user.save()
    ctx.session.user = user
    await ctx.redirect('/')
  } else {
    await ctx.render('register', {
      error: 'The email is already taken, please choose a different one'
    })
  }
}

module.exports = compose([
  validator({
    body: bodySchema
  }),
  encryptPassword(10),
  register
])
