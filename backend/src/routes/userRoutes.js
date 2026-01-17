const express = require("express")
const router = express.Router()

const {
  getStores,
  submitRating,
} = require("../controllers/userController")

const authMiddleware = require("../middleware/authMiddleware")
const roleMiddleware = require("../middleware/roleMiddleware")

// View Stores
router.get(
  "/stores",
  authMiddleware,
  roleMiddleware(["USER"]),
  getStores
)

// Submit Rating
router.post(
  "/rate",
  authMiddleware,
  roleMiddleware(["USER"]),
  submitRating
)

module.exports = router
