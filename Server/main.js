const config = require("./config")
const express = require("express")

const App = express()


App.listen(config.PORT, () => {
    console.log("I'm running :)");
})

