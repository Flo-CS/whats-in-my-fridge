const express = require("express");

const productsController = require("../controllers/product.controller");
const verifyTokenMiddleware = require("../middlewares/verifyToken.middleware");

const Router = express.Router();

Router.use(verifyTokenMiddleware);

Router.get("/", productsController.getAllProducts);
Router.get("/stats", productsController.getStats);
Router.get("/:barcode", productsController.getOneProduct);
Router.post("/:barcode", productsController.addOneProduct);
Router.put("/:barcode", productsController.updateOneProduct);
Router.delete("/:barcode", productsController.deleteOneProduct);

module.exports = Router;
