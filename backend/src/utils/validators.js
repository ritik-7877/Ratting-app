const validateName = (name) => {
  if (!name) return "Name is required"
  if (name.length < 20 || name.length > 60) {
    return "Name must be between 20 and 60 characters"
  }
  return null
}

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email) return "Email is required"
  if (!emailRegex.test(email)) return "Invalid email format"
  return null
}

const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,16}$/
  if (!password) return "Password is required"
  if (!passwordRegex.test(password)) {
    return "Password must be 8-16 chars, include one uppercase & one special character"
  }
  return null
}

const validateAddress = (address) => {
  if (address && address.length > 400) {
    return "Address must not exceed 400 characters"
  }
  return null
}

module.exports = {
  validateName,
  validateEmail,
  validatePassword,
  validateAddress,
}
