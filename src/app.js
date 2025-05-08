import express from 'express'
import dotenv from 'dotenv'
import instanceMongoDB from './database/init.mongodb.js'
import multer from 'multer'
import userRoute from './routes/user.route.js';
dotenv.config()

const PORT = process.env.PORT
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './src/uploads')
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split('.').pop()
    const uniqueName = 'User-' + Date.now() + '.' + ext
    cb(null, uniqueName)
  }
})

var upload = multer({ storage: storage })

// Upload 1 img
app.post('/uploadfile', upload.single('User'), (req, res, next) => {
  const file = req.file
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
  res.send(file)
})

// Upload many img
app.post('/uploadfiles', upload.array('Users', 10), (req, res, next) => {
  const files = req.files
  if (!files || files.length === 0) {
    const error = new Error('Please upload files')
    error.httpStatusCode = 400
    return next(error)
  }
  res.send(files)
})

// Upload 1 or many img
app.post('/uploadimg', upload.fields([
  { name: 'one', maxCount: 1},
  { name: 'many', maxCount: 10 }
]), (req, res) => {
  const one = req.files['one']?.[0]
  const many = req.files['many']

  if (!one || !many || many.length === 0) {
    return res.status(400).json({ message: 'Please upload file' })
  }

  res.json({
    message: 'Successful',
    one: one.filename,
    many: many.map(file => file.filename)
  })
})

app.use(userRoute)

instanceMongoDB

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})