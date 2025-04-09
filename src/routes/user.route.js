import { Router } from "express";
import { UserValidator } from "../middleware/user.validate.js";
import { UserController } from "../controllers/user.controller.js";

const router = Router()
const userController = new UserController()

router.get('/home/users', userController.getAllUser.bind(userController))

router.get('/home/users/:id', userController.getUserById.bind(userController))

router.post('/home/create', UserValidator.validateCreateUser, userController.createUser.bind(userController))

router.put('/home/users/:id', UserValidator.validateCreateUser, userController.updateUser.bind(userController))

router.delete('/home/users/:id', userController.deleteUser.bind(userController))

export default router