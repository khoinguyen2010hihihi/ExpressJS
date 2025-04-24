import UserModel from '../models/user.model.js'

export class UserService {
  getAllUsers = async () => {
    return await UserModel.find()
  }

  getUserById = async (id) => {
    return await UserModel.findById(id)
  }

  createUser = async (userData) => {
    const user = new UserModel(userData)
    return await user.save()
  }

  updateUser = async (id, userData) => {
    const updatedUser = await UserModel.findByIdAndUpdate(id, userData, {
      new: true,
      runValidators: true
    })
    return updatedUser
  }

  deleteUser = async (id) => {
    const result = await UserModel.deleteOne({ _id: id })
    return result.deletedCount > 0
  }
}
