import { Router } from "express"
import { UserValidator } from "../middleware/user.validate.js"
import { UserController } from "../controllers/user.controller.js"

const router = Router()
const userController = new UserController()

router.get('/home/users', userController.getAllUser.bind(userController))

router.get('/home/users/create', userController.showCreateForm.bind(userController))

router.post('/home/users/create', UserValidator.validateCreateUser, userController.createUser.bind(userController))

router.get('/home/users/:id/edit', userController.showEditForm.bind(userController))

router.post('/home/users/:id/edit', UserValidator.validateCreateUser, userController.updateUser.bind(userController))

router.get('/home/users/:id', userController.getUserById.bind(userController))

router.get('/home/users/:id/delete', userController.deleteUser.bind(userController))

export default router