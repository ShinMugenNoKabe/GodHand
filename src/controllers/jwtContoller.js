import jwt from 'jsonwebtoken'
import { Router } from 'express'

export const tokenRouter = Router()

const generateJWT = (body) => {
  const { JWT_KEY } = process.env

  return jwt.sign({
    ...body,
    exp: Math.floor(Date.now() / 1000) + (60 * 60)
  },
  JWT_KEY,
  {
    algorithm: 'HS256'
  })
}

const generateJWTForUser = (user) => {
  delete user.password
  return generateJWT(user)
}

const validateJWT = (token) => {
  const result = {
    success: false,
    message: null,
    decodedJWT: null
  }

  if (!token) {
    result.message = 'Please send the Token in the Authorization Header.'
    return result
  }

  let decodedJWT = null

  const { JWT_KEY } = process.env

  try {
    decodedJWT = jwt.verify(token, JWT_KEY)
  } catch (err) {
    result.message = `An error has ocurred while validating the Token: ${err.message}`
    return result
  }

  result.success = true
  result.decodedJWT = decodedJWT

  return result
}

const validateJWTMiddleware = (req, res, next) => {
  const { success, message, decodedJWT } = validateJWT(req.token)

  if (!success) {
    return res
      .status(403)
      .send({
        detail: message
      })
  }

  req.user = decodedJWT

  return next()
}

export {
  generateJWT,
  generateJWTForUser,
  validateJWT,
  validateJWTMiddleware
}
