import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET

export class AuthService {
  generateAccessToken(userId) {
    return jwt.sign({ id: userId }, ACCESS_TOKEN_SECRET, { expiresIn: '15m'})
  }

  generateRefreshToken(userId) {
    return jwt.sign({ id: userId }, REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
  }
}