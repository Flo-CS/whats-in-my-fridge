// Libraries & cie
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// Config and utils
const config = require("./config");

// Setup DB connection
mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB connected :)"))
  .catch((error) => console.log(error));

// Routes
const productRoute = require("./routes/product.route");
const userRoute = require("./routes/user.route");

// Setup Express App
const App = express();

// Middlewares
App.use(cors());
App.use(bodyParser.json());

// Routers
App.use(`${config.API_ENDPOINT}/products`, productRoute);
App.use(`${config.API_ENDPOINT}/auth`, userRoute);

App.listen(config.PORT, () => {
  console.log("I'm running :)");
});
