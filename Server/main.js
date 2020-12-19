// Libraries & cie
const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()

// Config and utils
const config = require("./config")

// Routes
const productsRoute = require("./routes/productsRoute")

// Setup DB connection
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('DB connected :)'))
    .catch(err => console.log(err));

// Setup Express App
const App = express()

App.use(`${config.API_ENDPOINT}/products`, productsRoute)

App.listen(config.PORT, () => {
    console.log("I'm running :)");
})

