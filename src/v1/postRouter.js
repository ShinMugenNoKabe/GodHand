import { Router } from 'express'
import postController from '../controllers/postController.js'

const postRouter = new Router()

postRouter
  .get('/', (req, res) => {
    res.json({ detail: 'OK' })
  })
  .post('/', postController.testGenerate)

export default postRouter
