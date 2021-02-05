const express = require("express");
const usersController = require("../controllers/user.controller");

const Router = express.Router();

Router.post("/login", usersController.loginUser);
Router.post("/register", usersController.registerUser);

module.exports = Router;
