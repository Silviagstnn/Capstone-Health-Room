const express = require('express')
const app = express()

const port = process.env.PORT || 8080

// Midleware
app.use(express.json())
// app.use(express.static('./covid/build'))

// Routes
const indexRoute = require('./routes/index')

app.use('/', indexRoute)

app.listen(port, () => console.log(`Server listening to port: ${port}`))