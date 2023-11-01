import { startServer } from './app.js'
import { connectToMongoose } from './database/connection.js'
import dotenv from 'dotenv'

dotenv.config()

await connectToMongoose()
startServer()
