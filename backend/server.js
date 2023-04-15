const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const app = express()
const connectDB = require('./config/db.js')

connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(require('./routes/testRoute.js'))


app.listen(port, () => console.log(`Server running on port ${port}`))
