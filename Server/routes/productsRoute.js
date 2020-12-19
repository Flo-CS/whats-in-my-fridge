const express = require("express")

const productsController = require("./../controllers/productsController")

const ProductsRouter = express.Router()

ProductsRouter.get("/", productsController.getAllProducts)

module.exports = ProductsRouter