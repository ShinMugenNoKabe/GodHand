import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  name: {
    user: String,
    first: String,
    last: String
  },
  password: String,
  registered_at: {
    type: Date, default: Date.now
  },
  last_updated_at: {
    type: Date, default: Date.now
  }
})

const User = model('User', userSchema, 'users')

export {
  User
}
