import { Post } from '../models/Post.js'
import { User } from '../models/User.js'

import postRepository from '../repositories/postRepository.js'

const testGenerate = async (req, res) => {
  try {
    const newUser = new User({
      name: {
        user: 'Paco'
      }
    })

    await newUser.save({})

    const newPost = new Post({
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mollis turpis sit amet felis congue elementum. Nulla convallis nulla vel mauris scelerisque suscipit. Fusce cursus nisi ut neque auctor facilisis. Nullam felis massa, feugiat et massa ut, vestibulum commodo turpis. Vestibulum quis pulvinar dolor, ut malesuada purus. Suspendisse ac enim iaculis, ultricies est eget, feugiat ipsum. Curabitur et enim finibus est convallis pharetra sit amet ac nunc. Sed sed elementum lacus. Morbi quis pretium odio, in efficitur ex. Ut ullamcorper eros in orci blandit tincidunt. Nullam malesuada ipsum vitae volutpat volutpat. Mauris rhoncus bibendum orci et commodo. Nunc gravida elit vel arcu blandit, ac imperdiet lorem aliquam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In porttitor dapibus ipsum eget feugiat.',
      user: newUser
    })

    await postRepository.saveNewPost(newPost)

    res.send({
      detail: 'ok'
    })
  } catch (err) {
    res
      .status(400)
      .send(err.errors)
  }
}

const getAllByUsername = async (req, res) => {
  try {
    const { username } = req.params

    if (!username) {
      throw new Error('Username is empty')
    }

    const { limit, skip } = req.query
    const userPosts = await postRepository.getAllByUsername(username, limit, skip)

    return res
      .send({
        limit,
        skip,
        posts: userPosts
      })
  } catch (err) {
    return res
      .status(400)
      .send(err)
  }
}

const getById = async (req, res) => {
  const { postId } = req.params

  try {
    const post = await postRepository.getById(postId)

    if (!post) {
      return res
        .status(404)
        .send({
          detail: 'Post not found'
        })
    }

    return res.send(post)
  } catch (err) {
    return res
      .status(400)
      .send(err)
  }
}

export default {
  testGenerate,
  getAllByUsername,
  getById
}
