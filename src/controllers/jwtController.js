import jwt from 'jsonwebtoken'

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

  const { JWT_KEY } = process.env

  try {
    result.decodedJWT = jwt.verify(token, JWT_KEY)
  } catch (err) {
    result.message = `An error has ocurred while validating the Token: ${err.message}`
    return result
  }

  result.success = true

  return result
}

export {
  generateJWT,
  generateJWTForUser,
  validateJWT
}
