import { User } from "../models/user.model.js"

export class UserService {
  constructor() {
    this.User = new User()
  }

  getAllUsers = () => {
    return this.User.getUsersRaw()
  }

  getUserById = (id) => {
    const users = this.User.getUsersRaw();
    return users.find((user) => user.id === parseInt(id))
  }

  createUser = (userData) => {
    const users = this.User.getUsersRaw()
    const newUser = { id: users.length + 1, ...userData }
    users.push(newUser)
    this.User.saveUsersRaw(users)
    return newUser
  }

  updateUser = (id, userData) => {
    const users = this.User.getUsersRaw()
    const index = users.findIndex((u) => u.id === parseInt(id))
    if (index === -1) return null
    users[index] = { ...users[index], ...userData }
    this.User.saveUsersRaw(users)
    return users[index]
  }

  deleteUser = (id) => {
    const users = this.User.getUsersRaw()
    const index = users.findIndex((u) => u.id === parseInt(id))
    if (index === -1) return false
    users.splice(index, 1)
    this.User.saveUsersRaw(users)
    return true
  }
}