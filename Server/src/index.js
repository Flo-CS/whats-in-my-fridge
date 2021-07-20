const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");

const errorsManagerMiddleware = require("./middlewares/errorsManagerMiddleware");

require("dotenv").config();

const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const {downloadTaxonomiesFiles} = require("./helpers/taxonomies");


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

// Setup Express App
const App = express();

// Middlewares
App.use(morgan("short"));
App.use(cookieParser());
App.use(cors({credentials: true, origin: true}));
App.use(bodyParser.json());

// Routes
App.use("/api/products", productRoute);
App.use("/api/auth", userRoute);


// Download taxonomies and facets files task (to maintain data updated)
setInterval(() => {
    (async () => {
        await downloadTaxonomiesFiles();
    })();
}, 60 * 60 * 1000);

if (process.env.ENVIRONMENT === "YES") {
    (async () => {
        await downloadTaxonomiesFiles();
    })();
    App.use(express.static(path.join(__dirname, 'client/build')));
    App.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

// Errors manager middleware
App.use(errorsManagerMiddleware());


App.listen(process.env.PORT, () => {
    console.log(`I'm running on ${process.env.PORT} :)`);
});
