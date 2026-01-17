const User = require("../models/User")
const Store = require("../models/Store")
const db = require("../config/db")

const getDashboardStats = (req, res) => {
    const stats = {}

    db.get(`SELECT COUNT(*) as totalUsers FROM users`, [], (err, row) => {
        stats.totalUsers = row.totalUsers

        db.get(`SELECT COUNT(*) as totalStores FROM stores`, [], (err2, row2) => {
            stats.totalStores = row2.totalStores

            db.get(`SELECT COUNT(*) as totalRatings FROM stores`, [], (err3, row3) => {
                stats.totalRating = row3.totalRatings
                res.json(stats)
            })
        })
    })
}

const createUser  = (req, res) => {
    const {name, email, password, address, role} = req.body

    UsercreateUser({name, email, password, address, role}, (err) => {
        if (err) {
            return res.status(500).json({message: "User creation failed"})
        } 
        res.status(201).json({message: "User created successfully"}) 
    })
}

const createStore = (req, res) => {
    const {name, email, address, ownerId} = req.body
    Store.createStore({name, email, address, ownerId}, (err) => {
        if (err) {
            return res.status(500).json({message: "Store creation failed"}) 
        }
        res.status(201).json({message: "Store created successfully"}) 
    })
}


const getUsers = (req, res) => {
  const query = `SELECT id, name, email, address, role FROM users`

  db.all(query, [], (error, rows) => {
    if (error) {
      return res.status(500).json({ message: "Failed to fetch users" })
    }
    res.json(rows)
  })
}


module.exports = {
    getDashboardStats,
    createUser,
    createStore,
    getUsers,
}