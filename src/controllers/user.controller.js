import { UserService } from "../services/user.service.js"

export class UserController {
  constructor() {
    this.userService = new UserService()
  }

  getAllUser = (req, res) => {
    this.userService.getAllUsers()
      .then(users => {
        res.status(200).json(users)
      })
      .catch(error => {
        console.error("Error fetching users:", error)
        res.status(500).json({ message: "Error fetching users" })
      })
  }

  getUserById = (req, res) => {
    this.userService.getUserById(req.params.id)
      .then(user => {
        if (!user) return res.status(404).json({ message: "User not found" })
        res.status(200).json(user)
      })
      .catch(error => {
        console.error("Error fetching user:", error)
        res.status(500).json({ message: "Error fetching user" })
      })
  }

  createUser = (req, res) => {
    const hobbies = req.body.hobbies ? req.body.hobbies.split(',').map(hobby => hobby.trim()) : []
    const newUser = { ...req.body, hobbies }

    this.userService.createUser(newUser)
      .then(user => {
        res.status(201).json(user)
      })
      .catch(error => {
        console.error("Error creating user:", error)
        res.status(500).json({ message: "Error creating user" })
      })
  }

  updateUser = (req, res) => {
    const hobbies = req.body.hobbies ? req.body.hobbies.split(',').map(hobby => hobby.trim()) : []
    const updatedUserData = { ...req.body, hobbies }

    this.userService.updateUser(req.params.id, updatedUserData)
      .then(updatedUser => {
        if (!updatedUser) return res.status(404).json({ message: "User not found" })
        res.status(200).json(updatedUser)
      })
      .catch(error => {
        console.error("Error updating user:", error)
        res.status(500).json({ message: "Error updating user" })
      })
  }

  deleteUser = (req, res) => {
    this.userService.deleteUser(req.params.id)
      .then(isDeleted => {
        if (!isDeleted) return res.status(404).json({ message: "User not found" })
        res.status(200).json({ message: "User deleted successfully" })
      })
      .catch(error => {
        console.error("Error deleting user:", error)
        res.status(500).json({ message: "Error deleting user" })
      })
  }
}
