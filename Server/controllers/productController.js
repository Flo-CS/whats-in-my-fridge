const models = require("./../models/index");
const {validationErrors} = require("../helpers/errors");
const {databaseErrors} = require("../helpers/errors");
const {ValidationError} = require("../helpers/errors");
const {DatabaseError} = require("../helpers/errors");
const {getOFFdata} = require("../helpers/product");
const {ProductsStats} = require("../helpers/productsStats");


const getAllProducts = async (req, res, next) => {
    const products = await models.Product.find({
        user: req.verifiedToken.id,
    }).catch(() => {
        return next(new DatabaseError(databaseErrors.operation));
    });

    return res.status(200).json({products: products.map(product => product.export())});

};

const getOneProduct = async (req, res, next) => {
    const barcode = req.params.barcode;

    const product = await models.Product.findOne({
        user: req.verifiedToken.id,
        barcode: barcode,
    }).catch(() => {
        return next(new DatabaseError(databaseErrors.operation));
    });

    // Take the opportunity to update the product data (because the data evolves on open food facts)
    try {
        product.data = await getOFFdata(barcode);
    } catch (error) {
        return next(error);
    }

    await product.save().catch(() => {
        return next(new DatabaseError(databaseErrors.save));
    });

    return res.status(200).json({product: product.export()});
};

const addOneProduct = async (req, res, next) => {
    const barcode = req.params.barcode;

    const productToUpdate = await models.Product.findOne({
        user: req.verifiedToken.id,
        barcode: barcode,
    }).catch(() => {
        return next(new DatabaseError(databaseErrors.operation));
    });

    // UPDATE PRODUCT QUANTITY IF PRODUCT ALREADY EXISTS
    if (productToUpdate) {
        productToUpdate.updateQuantity(productToUpdate.quantity + 1);

        productToUpdate.save().catch(() => {
            return next(new DatabaseError(databaseErrors.save));
        });

        return res.status(200).json({product: productToUpdate.export(), updated: true});
    }

    // CREATE NEW PRODUCT IF PRODUCT NOT EXISTS
    let productData;
    try {
        productData = await getOFFdata(barcode);
    } catch (error) {
        return next(error);
    }

    const productToCreate = new models.Product({
        user: req.verifiedToken.id,
        barcode: barcode,
        data: productData,
    });

    await productToCreate.save().catch(() => {
        return next(new DatabaseError(databaseErrors.save));
    });

    return res.status(200).json({product: productToCreate.export(), updated: false});
};

const getStats = async (req, res, next) => {
    const {startDate, endDate, timeUnit} = req.query;

    const products = await models.Product.find({user: req.verifiedToken.id})
        .catch(() => {
            return next(new DatabaseError(databaseErrors.operation));
        });


    const stats = new ProductsStats(products, startDate, endDate, timeUnit).getStats();


    return res.status(200).json({stats});

};

const updateOneProductQuantity = async (req, res, next) => {
    const barcode = req.params.barcode;
    const quantity = req.body.quantity;


    const product = await models.Product.findOne(
        {user: req.verifiedToken.id, barcode: barcode}
    ).catch(() => {
        return next(new DatabaseError(databaseErrors.operation));
    });

    if (quantity < 0) return next(new ValidationError(validationErrors.quantityLowerThanZero));

    product.updateQuantity(quantity);

    product.save().catch(() => {
        return next(new DatabaseError(databaseErrors.save));
    });

    return res.status(200).json({presences: product.presences, quantity: product.quantity});
};

const deleteOneProduct = async (req, res, next) => {
    const barcode = req.params.barcode;

    const product = await models.Product.findOneAndDelete({
        user: req.verifiedToken.id,
        barcode: barcode,
    }).catch(() => {
        return next(new DatabaseError(databaseErrors.operation));
    });

    res.status(200).json({product: product.export()});

};
module.exports = {
    getAllProducts,
    getOneProduct,
    addOneProduct,
    getStats,
    updateOneProductQuantity,
    deleteOneProduct,
};
