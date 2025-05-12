import { Router } from "express"
import { UserValidator } from "../middleware/user.validate.js"
import { UserController } from "../controllers/user.controller.js"
import { UserService } from "../services/user.service.js"

const router = Router()

const userService = new UserService()
const userController = new UserController(userService)

// User routes
router.get('/api/users', userController.getAllUser.bind(userController))
router.get('/api/users/:id', userController.getUserById.bind(userController))
router.post('/api/users', UserValidator.validateCreateUser, userController.createUser.bind(userController))
router.put('/api/users/:id', UserValidator.validateCreateUser, userController.updateUser.bind(userController))
router.delete('/api/users/:id', userController.deleteUser.bind(userController))

export default router
