const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/User")
const {
  validateName,
  validateEmail,
  validatePassword,
  validateAddress,
} = require("../utils/validators")

// ---------------- SIGNUP ----------------
const signup = (req, res) => {
  const { name, email, password, address } = req.body

  const nameError = validateName(name)
  const emailError = validateEmail(email)
  const passwordError = validatePassword(password)
  const addressError = validateAddress(address)

  if (nameError || emailError || passwordError || addressError) {
    return res.status(400).json({
      message: nameError || emailError || passwordError || addressError,
    })
  }

  User.findUserByEmail(email, async (error, existingUser) => {
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const userData = {
      name,
      email,
      password: hashedPassword,
      address,
      role: "USER",
    }

    User.createUser(userData, (err) => {
      if (err) {
        return res.status(500).json({ message: "User creation failed" })
      }
      res.status(201).json({ message: "Signup successful" })
    })
  })
}

// ---------------- LOGIN ----------------
const login = (req, res) => {
  const { email, password } = req.body

  User.findUserByEmail(email, async (error, user) => {
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    )

    res.json({ token, role: user.role })
  })
}

// ---------------- UPDATE PASSWORD ----------------
const updatePassword = async (req, res) => {
  const { newPassword } = req.body
  const passwordError = validatePassword(newPassword)

  if (passwordError) {
    return res.status(400).json({ message: passwordError })
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10)

  const query = `UPDATE users SET password = ? WHERE id = ?`

  const db = require("../config/db")

  db.run(query, [hashedPassword, req.user.id], function (error) {
    if (error) {
      return res.status(500).json({ message: "Password update failed" })
    }
    res.json({ message: "Password updated successfully" })
  })
}

module.exports = {
  signup,
  login,
  updatePassword,
}
