// Libraries & cie
const axios = require("axios");

// Utils & cie
const config = require("../config");
const { createDefaultProduct } = require("../factories");

// Models
const UsersData = require("../models/usersData.model");

const DEFAULT_RANGE = "0-100";
const DEFAULT_SORT = "lastDateModified-asc";

const getAllProducts = async (req, res) => {
  const queryRange = req.query.range || DEFAULT_RANGE;
  const querySort = req.query.sort || DEFAULT_SORT;

  const rangeStart = parseInt(queryRange.split("-")[0]);
  const rangeEnd = parseInt(queryRange.split("-")[1]);

  const sortField = querySort.split("-")[0];
  const sortOrder = querySort.split("-")[1];

  try {
    // TODO : Implement the sorting
    const userData = await UsersData.findOne({ userId: req.verifiedToken.id });

    const products = userData.products.slice(rangeStart, rangeEnd);

    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getOneProduct = async (req, res) => {
  const paramsBarcode = req.params.barcode;

  try {
    const userData = await UsersData.findOne({ userId: req.verifiedToken.id });

    const product = userData.products.find((product) => {
      return product.barcode === paramsBarcode;
    });

    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const addOneProduct = async (req, res) => {
  const paramsBarcode = req.params.barcode;

  try {
    const userData = await UsersData.findOne({ userId: req.verifiedToken.id });

    // Verify if the product is not already in the database, if it's the case, just increase the quantity by 1
    let product = userData.products.find((product) => {
      return product.barcode === paramsBarcode;
    });

    if (product) {
      product.quantity += 1;
      await userData.save();
      return res.status(200).json({ product, updated: true });
    } else {
      product = createDefaultProduct(paramsBarcode);
    }

    // Get all openFoodFacts data for the product with their API
    // TODO : Only get used data
    const openFoodFactsResponse = await axios.get(
      `${config.OPENFOODFACTS_API_ENDPOINT}/product/${paramsBarcode}.json`
    );
    const openFoodFactsProductData = await openFoodFactsResponse.data.product;

    product.data = openFoodFactsProductData || {};

    // Add in the products
    userData.products.push(product);

    const userDataSaved = await userData.save();

    res.status(200).json({ product, updated: false });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

const getStats = async (req, res) => {
  try {
    const userData = await UsersData.findOne({ userId: req.verifiedToken.id });

    const products = userData.products;

    const totalNumberOfProducts = products.length;

    res.status(200).json({ totalNumberOfProducts });
  } catch (error) {
    res.status(500).json({ error });
  }
};

//TODO : Change lastDateModified on update
const updateOneProduct = async (req, res) => {
  const paramsBarcode = req.params.barcode;
  const bodyUpdatedProduct = req.body.data;

  try {
    const userData = await UsersData.findOne({ userId: req.verifiedToken.id });

    // Get the index of the product to update in the products list
    const productIndex = userData.products.findIndex((product) => {
      return product.barcode === paramsBarcode;
    });

    for (const propertyToUpdate in bodyUpdatedProduct) {
      userData.products[productIndex][propertyToUpdate] =
        bodyUpdatedProduct[propertyToUpdate];
    }

    await userData.save();

    res.status(200).json({ product: userData.products[productIndex] });
  } catch (error) {
    res.status(500).json({ error });
    console.log(error);
  }
};

const deleteOneProduct = async (req, res) => {
  const paramsBarcode = req.params.barcode;

  try {
    const userData = await UsersData.findOne({ userId: req.verifiedToken.id });

    // Get the index of the product to delete in the products list
    const productIndex = userData.products.findIndex((product) => {
      return product.barcode === paramsBarcode;
    });

    const product = userData.products[productIndex];

    // Check if there is a product corresponding to this barcode
    if (productIndex > -1) {
      userData.products.splice(productIndex, 1);
    }
    await userData.save();

    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ error });
  }
};
module.exports = {
  getAllProducts,
  getOneProduct,
  addOneProduct,
  getStats,
  updateOneProduct,
  deleteOneProduct,
};
