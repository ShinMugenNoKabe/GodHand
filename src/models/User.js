import { Schema, model } from 'mongoose'
import { genSalt, hash } from 'bcrypt'
import uniqueValidator from 'mongoose-unique-validator'

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    maxLength: 15
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxLength: 60
  },
  password: {
    type: String,
    required: true,
    minLength: 8
  },
  registered_at: {
    type: Date,
    default: Date.now
  },
  last_updated_at: {
    type: Date,
    default: Date.now
  }
})

userSchema.plugin(uniqueValidator, { message: 'The introduced username or email already exists' })

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()

  const { SALT_WORK_FACTOR } = process.env

  const salt = await genSalt(Number(SALT_WORK_FACTOR))

  const hashedPassword = await hash(this.password, salt)

  this.password = hashedPassword

  return next()
})

const User = model('User', userSchema, 'users')

export {
  User
}
