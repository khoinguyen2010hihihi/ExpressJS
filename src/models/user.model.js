import fs from 'fs'
import path from 'path'

export class User {
  constructor() {
    this.dbPath = path.resolve('db.json')
  }

  readDB = () => {
    const data = fs.readFileSync(this.dbPath, "utf-8")
    return JSON.parse(data)
  }

  writeDB = (data) => {
    fs.writeFileSync(this.dbPath, JSON.stringify(data, null, 2))
  }

  getAllUsers = () => {
    return this.readDB().users
  }

  getUserById = (id) => {
    const users = this.readDB().users
    return users.find(user => user.id === parseInt(id))
  }

  createUser = (userData) => {
    const db = this.readDB()
    const newUser = { id: db.users.length + 1, ...userData}
    db.users.push(newUser)
    this.writeDB(db)
    return newUser
  }

  updateUser = (id, userData) => {
    const db = this.readDB()
    const userIndex = db.users.find(user => user.id === parseInt(id))
    if(userIndex === -1) return null
    db.users[userIndex] = { ...db.users[userIndex], ...userData }
    this.writeDB(db)
    return db.users[userIndex]
  }

  deleteUser = (id) => {
    const db = this.readDB()
    const userIndex = db.users.find(user => user.id === parseInt(id))
    if(userIndex === -1) return false
    db.users.splice(userIndex, 1)
    this.writeDB(db)
    return true
  }
}