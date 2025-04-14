export class UserValidator {
  static validateCreateUser = (req, res, next) => {
    const errors = []
    const {
      fullName,
      age,
      gender,
      email,
      phone
    } = req.body

    // Validate name
    if(!fullName || fullName.length < 10) {
      errors.push("Name must be at least 10 characters")
    }

    // Validate age
    const ageNum = Number(age)
    if (isNaN(ageNum) || ageNum <= 0 || ageNum >= 20) {
      errors.push("Age must be a number between 0 and 20")
    }

    // Validate gender
    if(gender !== "Male" & gender !== "Female") {
      errors.push("Gender must be male or female")
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if(!email || !emailRegex.test(email)) {
      errors.push("Invalid email format")
    }

    // Validate phone
    const phoneRegex = /^09\d{9}$/
    if (!phone || !phoneRegex.test(phone)) {
      errors.push("Phone must start with 09 and have 11 digits")
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors })
    }
    next()
  }
}