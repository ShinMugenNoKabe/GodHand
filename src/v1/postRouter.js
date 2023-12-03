import { Router } from 'express'
import postController from '../controllers/postController.js'
import { validatePaginated } from '../middlewares/validatePaginated.js'

const postRouter = new Router()

postRouter
  .post('/', postController.testGenerate)
  .get('/user/:username', [validatePaginated], postController.getAllByUsername)
  .get('/:postId', postController.getById)

export default postRouter
