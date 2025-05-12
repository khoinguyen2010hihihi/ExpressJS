import jwt from 'jsonwebtoken'

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET

export class AuthMiddleware {
  static verifyToken(req, res, next) {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' })
    }

    const token = authHeader.split(' ')[1]

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ message: 'Invalid token' })

      req.userId = decoded.id
      next()
    })
  }
}