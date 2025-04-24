import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  hobbies: {
    type: [String],
    default: []
  }
}, {
  timestamps: true
})

const UserModel = mongoose.model('User', userSchema)
export default UserModel