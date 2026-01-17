const express = require("express")
const router = express.Router()

const { getStoreRatings } = require("../controllers/storeOwnerController")

const authMiddleware = require("../middleware/authMiddleware")
const roleMiddleware = require("../middleware/roleMiddleware")

// Store Owner Dashboard
router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware(["STORE_OWNER"]),
  getStoreRatings
)

module.exports = router
