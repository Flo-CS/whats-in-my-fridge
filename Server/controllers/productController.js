const axios = require("axios");
const dayjs = require("dayjs");

const models = require("./../models/index");
const {Stats} = require("../helpers/stats");
const {OPEN_FOOD_FACTS_USEFUL_FIELDS, OPEN_FOOD_FACTS_API_ENDPOINT, DEFAULT_LANG_CODE} = require("../config");
const {convertTagsFieldsWithTaxonomies} = require("./../helpers/taxonomies");


function convertProductsDocuments(productsDocs) {
    return productsDocs.map(productDoc => {
        const product = productDoc.toObject();
        return {
            ...product,
            data: convertTagsFieldsWithTaxonomies(product.data, DEFAULT_LANG_CODE)
        };
    });
}

function convertProductDocument(productDoc) {
    const product = productDoc.toObject();
    return {
        ...product,
        data: convertTagsFieldsWithTaxonomies(product.data, DEFAULT_LANG_CODE)
    };
}


const getAllProducts = async (req, res) => {

    const range = req.query.range || "0-100";

    const rangeStart = parseInt(range.split("-")[0]);
    const rangeEnd = parseInt(range.split("-")[1]);


    try {
        let products = await models.Product.find({
            user: req.verifiedToken.id,
        }).skip(rangeStart)
            .limit(rangeEnd);

        res.status(200).json({products: convertProductsDocuments(products)});
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


        res.status(200).json({product: convertProductDocument(product)});
    } catch (error) {
        res.status(500).json({error});
    }
};

const addOneProduct = async (req, res) => {
    const barcode = req.params.barcode;

    try {
        // UPDATE PRODUCT QUANTITY IF PRODUCT ALREADY EXISTS
        const productToUpdate = await models.Product.findOne(
            {
                user: req.verifiedToken.id,
                barcode: barcode,
            }
        );
        if (productToUpdate) {
            productToUpdate.quantity += 1;

            // Avoid changing presence all the time if quantity is updated
            if (productToUpdate.quantity === 1 || productToUpdate.quantity === 0) {
                productToUpdate.presences.push([dayjs().unix(), productToUpdate.quantity === 1]);
            }

            productToUpdate.save();

            return res.status(200).json({product: convertProductDocument(productToUpdate), updated: true});
        }

        // CREATE NEW PRODUCT IF PRODUCT DOESN'T EXIST
        const fields = OPEN_FOOD_FACTS_USEFUL_FIELDS.join(",");
        // Get all openFoodFacts data for the product with their API
        const openFoodFactsResponse = await axios.get(
            `${OPEN_FOOD_FACTS_API_ENDPOINT}/product/${barcode}.json?fields=${fields}`
        );


        let productData = openFoodFactsResponse.data.product;

        // We verify that the product exists and if we have a name for it in open food facts, 0 is status code for error
        if (openFoodFactsResponse.data.status === 0 || !productData.product_name) return res.status(404).json({});


        const productToCreate = new models.Product({
            user: req.verifiedToken.id,
            barcode: barcode,
            data: productData,
        });


        await productToCreate.save();


        res.status(200).json({product: convertProductDocument(productToCreate), updated: false});
    } catch (error) {
        res.status(500).json({error});
    }
};

const getStats = async (req, res) => {
    const {startTimestamp, endTimestamp} = req.query;

    try {
        const products = await models.Product.find({user: req.verifiedToken.id});

        const stats = new Stats(products, startTimestamp, endTimestamp).computeStats();

        res.status(200).json({stats});
    } catch (error) {
        res.status(500).json({error});
    }
};

//TODO : Change lastDateModified on update
const updateOneProductQuantity = async (req, res) => {
    const barcode = req.params.barcode;
    const quantity = req.body.quantity;

    try {
        const product = await models.Product.findOne(
            {user: req.verifiedToken.id, barcode: barcode}
        );

        if (quantity < 0) {
            return res.status(400).json();
        }

        product.quantity = quantity;

        // Avoid changing presence all the time if quantity is updated
        if (quantity === 1 || quantity === 0) {
            product.presences.push([dayjs().unix(), quantity === 1]);
        }

        product.save();

        res.status(200).json({presences: product.presences, quantity: product.quantity});
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

        res.status(200).json({product: convertProductDocument(product)});
    } catch (error) {
        res.status(500).json({error});
    }
};
module.exports = {
    getAllProducts,
    getOneProduct,
    addOneProduct,
    getStats,
    updateOneProductQuantity,
    deleteOneProduct,
};
