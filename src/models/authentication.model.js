import mongoose from "mongoose"

const authSchema = new mongoose.Schema({
  email: { 
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: "user"
  }
}, {
  timestamps: true
})

const AuthModel = mongoose.model('Authentication', authSchema)
export default AuthModel