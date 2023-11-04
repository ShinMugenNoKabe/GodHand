import express from 'express'
import bearerToken from 'express-bearer-token'

import postRouter from './v1/postRouter.js'
import userRouter from './v1/userRouter.js'

const app = express()
app.use(express.json())
app.use(bearerToken())

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
