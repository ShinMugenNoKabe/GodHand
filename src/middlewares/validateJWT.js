import { validateJWT } from '../controllers/jwtController.js'

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
  validateJWTMiddleware
}
