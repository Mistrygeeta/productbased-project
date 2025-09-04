const express = require("express")
const cookieParser = require("cookie-parser")
const authRoutes = require("./routers/auth.route")
const productRoutes= require("./routers/product.route")
const app = express()

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRoutes)
app.use("/api/products", productRoutes)

module.exports = app;