export class UserValidator {
  static validateCreateUser = (req, res, next) => {
    const errors = []
    const {
      name,
      age,
      email,
      hobbies
    } = req.body

    // Validate name
    if(!name || name.length < 3) {
      errors.push("Name must be at least 3 characters")
    }

    // Validate age
    if(!age || age < 0 || age > 30) {
      errors.push("Age must be between 0 and 30")
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if(!email || !emailRegex.test(email)) {
      errors.push("Invalid email format")
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors })
    }
    next()
  }
}
