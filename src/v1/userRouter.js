import { Router } from 'express'
import userController from '../controllers/userController.js'
import { validateJWTMiddleware } from '../controllers/jwtContoller.js'

const userRouter = new Router()

userRouter
  .post('/register', userController.registerUser)
  .post('/login', validateJWTMiddleware, userController.login)

export default userRouter
