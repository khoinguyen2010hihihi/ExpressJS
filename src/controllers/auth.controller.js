import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import UserModel from '../models/user.model.js'

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET

export class AuthController {
  constructor (authService) {
    this.authService = authService
  }

  register = async (req, res) => {
    const { name, email, password, age, hobbies } = req.body
    
    const existingUser = await UserModel.findOne({email })
    if (existingUser) {
      return res.status(400).json({ message: 'Email already existed' })
    }

    const hasdedPassword = await bcrypt.hash(password, 10)

    const user = new UserModel({
      name,
      email,
      password: hasdedPassword,
      age,
      hobbies,
      role: 'user'
    })

    await user.save()
  }

  login = async (req, res) => {
    const { email, password } = req.body

    const user = await UserModel.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Email not found'})
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Password is not correct' })
    }

    const accessToken = this.authService.generateAccessToken(user._id)
    const refreshToken = this.authService.generateRefreshToken(user._id)

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    }).json({ accessToken })
  }

  refreshToken = async (req, res) => {
    const token = req.cookies.refreshToken
    if (!token) return res.sendStatus(401)

    jwt.verify(token, REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.sendStatus(401)
        
      const newAccessToken = this.authService.generateAccessToken(decoded.id)
      const newRefreshToken = this.authService.generateRefreshToken(decoded.id)

      res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
      }).json({ accessToken: newAccessToken })
      })
  }

  logout = (req, res) => {
    res.clearCookie('refreshToken')
    res.json({ message: 'Lougout!!!' })
  }

  getMe = async (req, res) => {
    const userId = req.userId
    const user = await UserModel.findById(userId).select('-password')
    if (!user) return res.status(404).json({ message: 'User not found '})
    res.json(user)
  }
}