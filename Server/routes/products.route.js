const express = require("express")

const productsController = require("../controllers/products.controller")
const verifyTokenMiddleware = require("../middlewares/verifyTokenMiddleware")

const Router = express.Router()

Router.use(verifyTokenMiddleware)

Router.get("/", productsController.getAllProducts)
Router.post("/", productsController.addOneProduct)
Router.get("/stats", productsController.getStats)
Router.get("/:barcode", productsController.getOneProduct)
Router.put("/:barcode", productsController.updateOneProduct)
Router.delete("/:barcode", productsController.deleteOneProduct)


module.exports = Router