const Store = require("../models/Store")
const Rating = require("../models/Rating")

// ---------------- Get All Stores ----------------
const getStores = (req, res) => {
  Store.getAllStores((error, stores) => {
    if (error) {
      return res.status(500).json({ message: "Failed to fetch stores" })
    }
    res.json(stores)
  })
}

// ---------------- Submit Rating ----------------
const submitRating = (req, res) => {
  const { storeId, rating } = req.body
  const userId = req.user.id

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ message: "Rating must be between 1 and 5" })
  }

  Rating.submitRating({ userId, storeId, rating }, (error) => {
    if (error) {
      return res.status(500).json({ message: "Rating submission failed" })
    }
    res.json({ message: "Rating submitted successfully" })
  })
}

module.exports = {
  getStores,
  submitRating,
}
