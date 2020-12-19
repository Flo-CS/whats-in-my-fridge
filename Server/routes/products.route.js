const express = require("express")

const productsController = require("../controllers/products.controller")

const Router = express.Router()

Router.get("/", productsController.getAllProducts)
Router.get("/:barcode", productsController.getOneProduct)
Router.post("/", productsController.addOneProduct)
Router.get("/stats", productsController.getStats)
Router.put("/:barcode", productsController.updateOneProductData)
Router.delete("/:barcode", productsController.deleteOneProduct)


module.exports = Router