const db = require("../config/db")

const createStore = (storeData, callback) => {
  const { name, email, address, ownerId } = storeData

  const query = `
    INSERT INTO stores (name, email, address, ownerId)
    VALUES (?, ?, ?, ?)
  `

  db.run(query, [name, email, address, ownerId], function (error) {
    if (error) {
      return callback(error)
    }
    callback(null, { id: this.lastID })
  })
}

const getAllStores = (callback) => {
  const query = `
    SELECT 
      s.id,
      s.name,
      s.email,
      s.address,
      IFNULL(AVG(r.rating), 0) AS rating
    FROM stores s
    LEFT JOIN ratings r ON s.id = r.storeId
    GROUP BY s.id
  `

  db.all(query, [], (error, rows) => {
    if (error) {
      return callback(error)
    }
    callback(null, rows)
  })
}

module.exports = {
  createStore,
  getAllStores,
}
