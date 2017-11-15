'use strict'

const joi = require('joi')
const compose = require('koa-compose')
const bcrypt = require('bcrypt')
const { pick } = require('lodash')
const { validator } = require('../../middleware')
const { Users } = require('../../models/mongoose')

const bodySchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).alphanum().required()
}).unknown().required()

async function register (ctx) {
  const { email, password } = ctx.request.body
  const checkEmailExistence = await Users.getUserByEmail(email)
  if (!checkEmailExistence) {
    const encryptedPassword = await encryptPassword(password)
    const user = new Users({
      email,
      password: encryptedPassword
    })
    await user.save()
    ctx.session.user = pick(user, ['_id', 'email'])
    await ctx.redirect('/')
  } else {
    await ctx.render('register', {
      error: 'The email is already taken, please choose a different one'
    })
  }
}

async function encryptPassword (pw, saltRounds) {
  const salt = await bcrypt.genSalt(saltRounds)
  return bcrypt.hash(pw, salt)
}

module.exports = compose([
  validator({
    body: bodySchema
  }),
  register
])
