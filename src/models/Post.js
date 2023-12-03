import { Schema, model, Types } from 'mongoose'

const postSchema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: 'User'
  },
  content: {
    type: String,
    maxLength: 240,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  last_updated_at: {
    type: Date,
    default: Date.now
  },
  /* likes: [
    {
      user: String,
      liked_at: {
        type: Date, default: Date.now
      }
    }
  ], */
  meta: {
    reposts: Number,
    likes: Number
  }
})

const Post = model('Post', postSchema, 'posts')

const postFieldsToShow = [
  '_id', 'content', 'created_at', 'last_updated_at'
]

export {
  Post,
  postFieldsToShow
}
