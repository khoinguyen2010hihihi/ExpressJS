import Authentication from '../models/authentication.model.js'
import UserModel from '../models/user.model.js'
import User from '../models/user.model.js'
import { hashPassword } from '../utils/hash.js'
import jwt from 'jsonwebtoken'

export class AuthService {
  registerUser = async (authData) => {
    const { email, password, role } = authData;

    const existing = await Authentication.findOne({ email });
    if (existing) {
      throw new Error('Email already exists');
    }

    const hashed = hashPassword(password);

    const auth = new Authentication({ email, password: hashed, role });
    await auth.save();

    const user = new User({
      email,
      name: '---user---',
      age: 1,
      hobbies: [],
      role
    });

    await user.save();

    return { message: 'Signup successful' };
  }

  loginUser = async (authData) => {
    const { email, password } = authData;
    const user = await Authentication.findOne({ email });

    if (!user) {
      throw new Error('User not found');
    }

    const hashed = hashPassword(password);

    if (user.password !== hashed) {
      throw new Error('Password is not correct');
    }

    const token = jwt.sign({
      email: user.email,
      role: user.role
    }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    return { token };
  }
}