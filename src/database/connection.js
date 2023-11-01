import { connect } from 'mongoose'

const connectToMongoose = async () => {
  const { MONGO_URL, MONGO_PORT, MONGO_DATABASE } = process.env
  connect(`mongodb://${MONGO_URL}:${MONGO_PORT}/${MONGO_DATABASE}`)

  console.log(`Connected to MongoDB on DB ${MONGO_DATABASE}`)
}

export {
  connectToMongoose
}
