const axios = require("axios");

const config = require("../config");

const models = require("./../models/index");

const DEFAULT_RANGE = "0-100";
const DEFAULT_SORT = "lastDateModified-asc";

const getAllProducts = async (req, res) => {
    const range = req.query.range || DEFAULT_RANGE;
    const sort = req.query.sort || DEFAULT_SORT;

    const rangeStart = parseInt(range.split("-")[0]);
    const rangeEnd = parseInt(range.split("-")[1]);

    const sortField = sort.split("-")[0];
    const sortOrder = sort.split("-")[1];

    try {
        // TODO : Implement the sorting
        const products = await models.Product.find({
            user: req.verifiedToken.id,
        })
            .skip(rangeStart)
            .limit(rangeEnd);

        res.status(200).json({products});
    } catch (error) {
        res.status(500).json({error});
    }
};

const getOneProduct = async (req, res) => {
    const barcode = req.params.barcode;

    try {
        const product = await models.Product.findOne({
            user: req.verifiedToken.id,
            barcode: barcode,
        });

        res.status(200).json({product});
    } catch (error) {
        res.status(500).json({error});
    }
};

const addOneProduct = async (req, res) => {
    const barcode = req.params.barcode;

    try {
        // UPDATE PRODUCT PART
        const productToUpdate = await models.Product.findOneAndUpdate(
            {
                user: req.verifiedToken.id,
                barcode: barcode,
            },
            {$inc: {quantity: 1}},
            {new: true}
        );

        if (productToUpdate) {
            return res.status(200).json({product: productToUpdate, updated: true});
        }

        // CREATE NEW PRODUCT PART
        const fields = config.USEFUL_OPEN_FOOD_FACTS_FIELDS.join(",");
        // Get all openFoodFacts data for the product with their API
        const openFoodFactsResponse = await axios.get(
            `${config.OPEN_FOOD_FACTS_API_ENDPOINT}/product/${barcode}.json?fields=${fields}`
        );


        const productData = openFoodFactsResponse.data.product;

        // We verify that the product exists and if we have a name for it in open food facts, 0 is status code for error
        if (openFoodFactsResponse.data.status === 0 || !productData.product_name) return res.status(404).json();


        const productToCreate = new models.Product({
            user: req.verifiedToken.id,
            barcode: barcode,
            data: productData,
        });

        await productToCreate.save();
        res.status(200).json({product: productToCreate, updated: false});
    } catch (error) {
        res.status(500).json({error});
    }
};

const getStats = async (req, res) => {
    try {
        const products = await models.Product.find({user: req.verifiedToken.id});

        const totalNumberOfProducts = products.length;

        res.status(200).json({totalNumberOfProducts});
    } catch (error) {
        res.status(500).json({error});
    }
};

//TODO : Change lastDateModified on update
const updateOneProduct = async (req, res) => {
    const barcode = req.params.barcode;
    const updatedProduct = req.body.data;

    try {
        const product = await models.Product.findOneAndUpdate(
            {user: req.verifiedToken.id, barcode: barcode},
            updatedProduct,
            {new: true}
        );

        res.status(200).json({product: product});
    } catch (error) {
        res.status(500).json({error});
    }
};

const deleteOneProduct = async (req, res) => {
    const barcode = req.params.barcode;

    try {
        const product = await models.Product.findOneAndDelete({
            user: req.verifiedToken.id,
            barcode: barcode,
        });

        res.status(200).json({product});
    } catch (error) {
        res.status(500).json({error});
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
