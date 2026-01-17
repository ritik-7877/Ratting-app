const Rating = require("../models/Rating")
const db = require("../config/db")

// ---------------- Get Store Ratings ----------------
const getStoreRatings = (req, res) => {
  const ownerId = req.user.id

  const query = `
    SELECT 
      s.id as storeId,
      s.name as storeName,
      AVG(r.rating) as averageRating
    FROM stores s
    LEFT JOIN ratings r ON s.id = r.storeId
    WHERE s.ownerId = ?
    GROUP BY s.id
  `

  db.get(query, [ownerId], (error, store) => {
    if (error) {
      return res.status(500).json({ message: "Failed to fetch store rating" })
    }

    if (!store) {
      return res.status(404).json({ message: "Store not found" })
    }

    Rating.getRatingsByStore(store.storeId, (err, users) => {
      if (err) {
        return res.status(500).json({ message: "Failed to fetch users" })
      }

      res.json({
        storeName: store.storeName,
        averageRating: store.averageRating || 0,
        users,
      })
    })
  })
}

module.exports = {
  getStoreRatings,
}
