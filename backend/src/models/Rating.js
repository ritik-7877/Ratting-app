const db = require('../config/db') 

const submitRating = (ratingData, callback) => {
    const {userId, storeId, rating} = ratingData
    
    const query = `
    INSERT INTO rating (userId, storeId, rating) 
    VALUES (?,?,?)
    ON CONFLICT (userId, storeId)
    DO UPDATE SET rating = excluded .rating
    `
} 

db.run(query, [userId, storeId, rating], function(error) {
    if (error) {
        return callback(error) 
    }
    callback(null)
})

const getRatingsByStore = (storeId, callback) => {
    const query = ` 
      SELECT 
        u.name,
        u.email,
        r.rating
      FROM rating r
      JOIN user u ON r.userId = u.id 
      WHERE r.storeId = ? 
    `

    db.all(query, [storeId], (error, row) => {
        if (error) {
            return callback(error) 
        }
        callback(null, row)
    })
}

module.exports = {
    submitRating ,
    getRatingsByStore ,
}