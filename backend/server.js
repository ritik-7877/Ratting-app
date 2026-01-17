const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const authRoutes = require("./src/routes/authRoutes")
const adminRoutes = require("./src/routes/adminRoutes")
const userRoutes = require("./src/routes/userRoutes")
const storeOwnerRoutes = require("./src/routes/storeOwnerRoutes")


app.use("/api/owner", storeOwnerRoutes)
app.use("/api/user", userRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/auth", authRoutes)

dotenv.config()

const app = express()

require("./src/models/initDb") 

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send(`Server is running`)
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})