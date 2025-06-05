import mongoose from "mongoose"

const optionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },
  votes: {
    type: Number,
    default: 0,
  },
  userVotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
})

const pollSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },
  description: {
    type: String,
    trim: true,
  },
  options: [optionSchema],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isLocked: {
    type: Boolean,
    default: false
  },
  expiresAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
})

export default mongoose.model('Poll', pollSchema)
