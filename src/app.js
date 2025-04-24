import express from 'express'
import dotenv from 'dotenv'
import instanceMongoDB from './database/init.mongodb.js'
import userRoute from './routes/user.route.js'
import path from 'path'

dotenv.config()

const PORT = process.env.PORT
const __dirname = path.resolve()

const app = express()

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'src/views'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/home', (req, res) => {
  res.send('Home')
})

app.use(userRoute)

instanceMongoDB

app.listen(PORT, () => {
  console.log(`Sv is running on http://localhost:${PORT}/home`)
})

