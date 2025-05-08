import { AuthService } from "../services/authentication.service.js"

export class AuthController {
  constructor(AuthService) {
    this.authService = AuthService
  }

  signup = async (req, res) => {
    try {
      const { email, password, role } = req.body

      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' })
      }

      const result = await this.authService.registerUser({ email, password, role })
      res.status(201).json(result)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  }

  login = async (req, res) => {
    try {
      const { email, password } = req.body

      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' })
      }

      const result = await this.authService.loginUser({ email, password })
      res.status(200).json(result)
    } catch (error) {
      res.status(400).json({ message: err.message })
    }
  }
}