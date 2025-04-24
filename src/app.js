import express from 'express'
import dotenv from 'dotenv'
import instanceMongoDB from './database/init.mongodb.js'
import userRoute from './routes/user.route.js'

dotenv.config()

const PORT = process.env.PORT
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(userRoute)

instanceMongoDB

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
});
