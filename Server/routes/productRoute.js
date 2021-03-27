const express = require("express");

const productsController = require("../controllers/productController");
const verifyTokenMiddleware = require("../middlewares/verifyTokenMiddleware");

const Router = express.Router();

Router.use(verifyTokenMiddleware());

Router.get("/", productsController.getAllProducts);
Router.get("/stats", productsController.getStats);
Router.get("/:barcode", productsController.getOneProduct);
Router.post("/:barcode", productsController.addOneProduct);
Router.put("/quantity/:barcode", productsController.updateOneProductQuantity);
Router.delete("/:barcode", productsController.deleteOneProduct);

module.exports = Router;
