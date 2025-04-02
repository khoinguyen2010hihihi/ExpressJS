import { Router } from "express";
import fs from 'fs'
import path from "path";
import dbjson from '../db.json' with { type : "json" }
const router = Router()

router.get('/home/users', (req, res) => {
  const users = dbjson.users;
  res.status(200).json(users);
})

router.get('/home/users/:id', (req, res) => {
  const { 
    id
  } = req.params
  const user = dbjson.users.find(user => user.id === parseInt(id));

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({
    user
  })
})

router.post('/home/create', (req, res) => {
  const {
    fullName,
    age,
    gender
  } = req.body

  const newUser = {
    id: dbjson.users.length + 1,
    fullName,
    age,
    gender
  }

  dbjson.users.push(newUser)
  fs.writeFileSync(path.resolve('db.json'), JSON.stringify(dbjson, null, 2))

  res.status(201).json(newUser)
})

router.put('/home/users/:id', (req, res) => {
  const { id } = req.params;
  const { 
    fullName,
    age,
    gender 
  } = req.body;

  const user = dbjson.users.find(user => user.id === parseInt(id))

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.fullName = fullName
  user.age = age
  user.gender = gender

  fs.writeFileSync(path.resolve('db.json'), JSON.stringify(dbjson, null, 2));

  res.status(200).json(user);
})

router.delete('/home/users/:id', (req, res) => {
  const { id } = req.params
  
  const userIndex = dbjson.users.find(user => user.id === parseInt(id))

  if(userIndex === -1) {
    return res.status(404).json({ message: "User not found" })
  }

  dbjson.users.splice(userIndex, 1)
  fs.writeFileSync(path.resolve('db.json'), JSON.stringify(dbjson, null, 2));
  res.status(200).json({ message: "User deleted successfully" });
})

export default router