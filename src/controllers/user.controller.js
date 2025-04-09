import { UserService } from "../services/user.service.js";
export class UserController {
  constructor() {
    this.userService = new UserService();
  }

  getAllUser = (req, res) => {
    const users = this.userService.getAllUsers();
    res.status(200).json(users);
  };

  getUserById = (req, res) => {
    const user = this.userService.getUserById(req.params.id);
    if (!user) return res.status(404).json("User not found");
    res.status(200).json(user);
  };

  createUser = (req, res) => {
    const newUser = this.userService.createUser(req.body);
    res.status(201).json(newUser);
  };

  updateUser = (req, res) => {
    const updatedUser = this.userService.updateUser(req.params.id, req.body);
    if (!updatedUser) return res.status(404).json("User not found");
    res.status(200).json(updatedUser);
  };

  deleteUser = (req, res) => {
    const isDeleted = this.userService.deleteUser(req.params.id);
    if (!isDeleted) return res.status(404).json("User not found");
    res.status(200).json("User deleted");
  };
}