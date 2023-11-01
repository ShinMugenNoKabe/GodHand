import express from 'express'
import postRouter from './v1/postRouter.js'

const app = express()
app.use('/api/v1/posts/', postRouter)

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
    console.log(`Server listening on http://localhost:${PORT}`)
  })
}

export default app
