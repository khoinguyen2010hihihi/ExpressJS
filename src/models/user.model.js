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

  getUsersRaw = () => this.readDB().users

  saveUsersRaw = (users) => {
    const db = this.readDB()
    db.users = users
    this.writeDB(db)
  }
}