// Libraries & cie
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")
require("dotenv").config()

// Config and utils
const config = require("./config")

// Routes
const productsRoute = require("./routes/products.route")
const authRoute = require("./routes/users.route")

// Setup DB connection
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('DB connected :)'))
    .catch(err => console.log(err));

// Setup Express App
const App = express()


App.use(cors())
App.use(bodyParser.json())

App.use(`${config.API_ENDPOINT}/products`, productsRoute)
App.use(`${config.API_ENDPOINT}/auth`, authRoute)

App.listen(config.PORT, () => {
    console.log("I'm running :)");
})

