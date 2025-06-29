import express from 'express'
import dotenv from 'dotenv'
import instanceMongoDB from './config/db.config.js'
import { errorHandler } from './handler/error-handler.js'
import cookieParser from 'cookie-parser'
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import pollRouter from './routes/poll.route.js'

dotenv.config()

const PORT = process.env.PORT

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use('/user', userRouter)
app.use('/auth', authRouter)
app.use('/api/poll', pollRouter)

instanceMongoDB

app.get('/', (req, res) => {
  res.status(200).json({"Test CI/CD": "Hello World Babe!"})
  })


app.use('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Not Found',
  })
})

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Sv is running on http://localhost:${PORT}/home`)
})