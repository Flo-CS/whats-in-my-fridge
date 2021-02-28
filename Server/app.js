const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const {SERVER_PORT} = require("./config");
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const {downloadAllTaxonomies} = require("./helpers/taxonomies");


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

// Download taxonomies files
// TODO : Cron task for this
//downloadAllTaxonomies()

// Setup Express App
const App = express();

// Middlewares
App.use(morgan("combined"));
App.use(cookieParser());
App.use(cors({credentials: true, origin: true}));
App.use(bodyParser.json());

// Routes
App.use("/api/products", productRoute);
App.use("/api/auth", userRoute);

App.listen(SERVER_PORT, () => {
    console.log("I'm running :)");
});
