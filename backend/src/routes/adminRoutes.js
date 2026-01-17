const express = require("express")
const router = express.Router()

const {
  getDashboardStats,
  createUser,
  createStore,
  getUsers,
} = require("../controllers/adminController")

const authMiddleware = require("../middleware/authMiddleware")
const roleMiddleware = require("../middleware/roleMiddleware")

// Dashboard
router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  getDashboardStats
)

// Create User
router.post(
  "/users",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  createUser
)

// Create Store
router.post(
  "/stores",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  createStore
)

router.get(
  "/users",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  getUsers
)

module.exports = router
