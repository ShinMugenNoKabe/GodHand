import { User } from '../models/User.js'
import { generateJWTForUser, validateJWT } from './jwtController.js'
import { compare } from 'bcrypt'

import userRepository from '../repositories/userRepository.js'

const registerUser = async (req, res) => {
  let result = null

  try {
    const newUser = new User(req.body)
    result = await userRepository.saveNewUser(newUser)
  } catch (err) {
    return res
      .status(400)
      .json(err.errors)
  }

  return res
    .status(201)
    .json({
      detail: generateJWTForUser(result._doc)
    })
}

const login = async (req, res) => {
  const checkJWT = validateJWT(req.token)

  if (checkJWT.success) {
    req.user = checkJWT.decodedJWT

    return res
      .status(200)
      .json({
        detail: req.token
      })
  }

  const userRequest = new User(req.body)

  const result = await userRequest.validateSync(['username', 'password'])

  if (result) {
    return res
      .status(400)
      .json(result.errors)
  }

  const user = await User.findOne({
    username: userRequest.username
  }).exec()

  if (!user) {
    return res
      .status(404)
      .json({
        detail: 'The username was not found'
      })
  }

  const isPasswordValid = await compare(userRequest.password, user.password)

  if (!isPasswordValid) {
    return res
      .status(403)
      .json({
        detail: 'The password is not valid'
      })
  }

  req.user = user._doc

  return res
    .status(200)
    .json({
      detail: generateJWTForUser(req.user)
    })
}

export default {
  registerUser,
  login
}
