const express = require("express");
const usersController = require("../controllers/userController");
const verifyTokenMiddleware = require("./../middlewares/verifyTokenMiddleware");

const Router = express.Router();


Router.post("/login", usersController.loginUser);
Router.post("/register", usersController.registerUser);
Router.post("/checkToken", verifyTokenMiddleware(), usersController.checkUserToken);
Router.post("/logout", usersController.logoutUser);

module.exports = Router;
