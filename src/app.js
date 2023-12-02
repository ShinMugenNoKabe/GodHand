import express from 'express'
import bearerToken from 'express-bearer-token'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import { readFileSync } from 'node:fs'
import YAML from 'yaml'

import postRouter from './v1/postRouter.js'
import userRouter from './v1/userRouter.js'

const app = express()
app.use(express.json())
app.use(bearerToken())
app.use(cors())

// Swagger Docs
const swaggerFile = readFileSync('./src/swagger.yaml', 'utf-8')
const swaggerDocument = YAML.parse(swaggerFile)
app.use('/api/v1/docs/', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// DB Endpoints
app.use('/api/v1/posts/', postRouter)
app.use('/api/v1/users/', userRouter)

app.use((req, res) => {
  res
    .status(404)
    .send({
      detail: 'Endpoint not found'
    })
})

export const startServer = () => {
  const PORT = process.env.PORT ?? 3_000

  app.listen(PORT, () => {
    console.log(`🚀 Server listening on http://localhost:${PORT}`)
  })
}

export default app
