const express = require("express")

const productsController = require("../controllers/products.controller")

const ProductsRouter = express.Router()

ProductsRouter.get("/", productsController.getAllProducts)
ProductsRouter.get("/:barcode", productsController.getOneProduct)
ProductsRouter.get("/stats", productsController.getStats)
ProductsRouter.put("/:barcode", productsController.updateOneProductData)
ProductsRouter.delete("/:barcode", productsController.deleteOneProduct)


module.exports = ProductsRouter