const express = require("express")
const usersController = require("../controllers/users.controller")

const Router = express.Router()

Router.post("/login", usersController.loginUser)
Router.post("/register", usersController.registerUser)

module.exports = Router