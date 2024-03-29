const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const errorsManagerMiddleware = require("./server/src/middlewares/errorsManagerMiddleware");

require("dotenv").config();

const productRoute = require("./server/src/routes/productRoute");
const userRoute = require("./server/src/routes/userRoute");
const {downloadTaxonomiesFiles, loadTaxonomiesFiles} = require("./server/src/helpers/open food facts/taxonomies");

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


downloadTaxonomiesFiles(false).then(() => {
    loadTaxonomiesFiles();
});


if (process.env.DOWNLOAD_TAXONOMIES_REGULARLY === "TRUE") {
    setInterval(() => {
        downloadTaxonomiesFiles(true).then(() => {
            loadTaxonomiesFiles();
        });
    }, 60 * 60 * 1000);
}

// Setup Express App
const App = express();

// Middlewares
App.use(morgan("short"));
App.use(cookieParser());
App.use(bodyParser.json());
const corsOrigin = process.env.ENVIRONMENT === "PRODUCTION" ? process.env.CLIENT_URL : true;
App.use(cors({credentials: true, origin: corsOrigin}));

// Routes
App.use("/api/products", productRoute);
App.use("/api/auth", userRoute);

// Errors manager middleware
App.use(errorsManagerMiddleware());


App.listen(process.env.PORT, () => {
    console.log(`I'm running on ${process.env.PORT} :)`);
});
