import { Router } from 'express'
import { AuthController } from '../controllers/auth.controller.js'
import { AuthService } from '../services/auth.service.js'
import { AuthMiddleware } from '../middleware/auth.middleware.js'

const router = Router()

const authService = new AuthService()
const authController = new AuthController(authService)

// Auth routes
router.post('/api/v1/auth/register', authController.register)
router.post('/api/v1/auth/login', authController.login)
router.post('/api/v1/auth/processNewToken', authController.refreshToken)
router.post('/api/v1/auth/logout', authController.logout)
router.get('/api/v1/users/me', AuthMiddleware.verifyToken, authController.getMe)

export default router
