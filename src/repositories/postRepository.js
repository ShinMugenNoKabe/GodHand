import { Post } from '../models/Post.js'
import { User } from '../models/User.js'

const saveNewPost = async (newPost) => {
  const result = await newPost.save()
  return result
}

const getAllByUsername = async (username, skip, limit) => {
  if (!username) {
    throw new Error('Username is empty')
  }

  const user = await User
    .findOne({ username })
    .exec()

  if (!user) {
    throw new Error('User not found')
  }

  const posts = await Post
    .find({
      user
    })
    .select([
      '_id', 'content', 'created_at', 'last_updated_at'
    ])
    .exec()

  return posts
}

export default {
  saveNewPost,
  getAllByUsername
}
