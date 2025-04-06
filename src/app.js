import express from 'express';
import dotenv from 'dotenv'
import userRoute from './routes/user.route.js'

dotenv.config();

const PORT = process.env.PORT

const app = express();

app.use(express.json())

app.get('/home', (req, res) => {
  res.send('Home')
})

app.use(userRoute)

app.listen(8000, () => {
  console.log(`Sv is running on http://localhost:${PORT}/home`);
})

