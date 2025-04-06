import { User } from "../models/user.model.js";

export class UserController {
  constructor() {
    this.User = new User();
  }

  getAllUser = (req, res) => {
    const users = this.User.getAllUsers()
    res.status(200).json(users)
  }

  getUserById = (req, res) => {
    const user = this.User.getUserById(req.params.id)
    if(!user) return res.status(404).json("User not found")
    res.status(200).json(user)
  }

  createUser = (req, res) => {
    const newUser = this.User.createUser(req.body)
    res.status(200).json(newUser)
  }

  updateUser = (req, res) => {
    const updatedUser = this.User.updateUser(req.params.id, req.body)
    if(!updatedUser) return res.status(404).json("User not found")
    res.status(200).json(updatedUser)
  }

  deleteUser = (req, res) => {
    const isDeleted = this.User.deleteUser(req.params.id);
    if(!isDeleted) return res.status(404).json("User not found");
    res.status(200).json("User deleted");
  }
}