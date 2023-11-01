// import Post from '../../models/Post.js'

const saveNewPost = async (newPost) => {
  const result = await newPost.save()
  return result
}

export default {
  saveNewPost
}
