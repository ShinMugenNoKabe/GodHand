import { Post, postFieldsToShow } from '../models/Post.js'
import { User } from '../models/User.js'

const saveNewPost = async (newPost) => {
  const result = await newPost.save()
  return result
}

const getAllByUsername = async (username, limit, skip) => {
  const user = await User
    .findOne({ username })
    .select([
      '_id', 'username'
    ])
    .exec()

  if (!user) {
    throw new Error('User not found')
  }

  const posts = await Post
    .find({ user })
    .select(postFieldsToShow)
    .sort('-created_at')
    .limit(limit)
    .skip(skip)
    .exec()

  return posts
}

const getById = async (postId) => {
  const post = await Post
    .findOne({ _id: postId })
    .select(postFieldsToShow)
    .populate('user', 'username')
    .exec()

  return post
}

export default {
  saveNewPost,
  getAllByUsername,
  getById
}
