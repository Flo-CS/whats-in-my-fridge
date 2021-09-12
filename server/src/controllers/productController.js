const models = require("../models");
const {validationErrors} = require("../helpers/errors");
const {databaseErrors} = require("../helpers/errors");
const {ValidationError} = require("../helpers/errors");
const {DatabaseError} = require("../helpers/errors");
const {ProductsStats} = require("../helpers/productsStats");


const getAllProducts = async (req, res, next) => {
    const products = await models.Product.find({
        user: req.verifiedToken.id,
    }).catch(() => next(new DatabaseError(databaseErrors.operation)));

    return res.status(200).json({products: products.map(product => product.toJSON())});

};

const getOneProduct = async (req, res, next) => {
    const barcode = req.params.barcode;

    const product = await models.Product.findOne({
        user: req.verifiedToken.id,
        barcode: barcode,
    }).catch(() => next(new DatabaseError(databaseErrors.operation)));

    return res.status(200).json({product: product.toJSON()});
};

const addOneProduct = async (req, res, next) => {
    const barcode = req.params.barcode;

    const productToUpdate = await models.Product.findOne({
        user: req.verifiedToken.id,
        barcode: barcode,
    }).catch(() => next(new DatabaseError(databaseErrors.operation)));

    // UPDATE PRODUCT QUANTITY IF PRODUCT ALREADY EXISTS
    // TODO : Remove that and handle it on frontend ??
    if (productToUpdate) {
        productToUpdate.updateQuantity(productToUpdate.quantity + 1);

        productToUpdate.save().catch(() => next(new DatabaseError(databaseErrors.save)));

        return res.status(200).json({product: productToUpdate.toJSON(), updated: true});
    }

    // CREATE NEW PRODUCT IF PRODUCT NOT EXISTS
    const productToCreate = await models.Product.createFromOFFData(barcode, req.verifiedToken.id)

    await productToCreate.save().catch(() => {
        next(new DatabaseError(databaseErrors.save))
    });

    return res.status(200).json({product: productToCreate.toJSON(), updated: false});
};

const getStats = async (req, res, next) => {
    const {startDate, timeGranularity} = req.body;

    const products = await models.Product.find({user: req.verifiedToken.id})
        .catch(() => next(new DatabaseError(databaseErrors.operation)));


    const stats = new ProductsStats(products, startDate, timeGranularity).getStats();


    return res.status(200).json({stats});

};

const updateOneProductQuantity = async (req, res, next) => {
    const barcode = req.params.barcode;
    const quantity = req.body.quantity;


    const product = await models.Product.findOne(
        {user: req.verifiedToken.id, barcode: barcode}
    ).catch(() => next(new DatabaseError(databaseErrors.operation)));

    if (quantity < 0) return next(new ValidationError(validationErrors.quantityLowerThanZero));

    product.updateQuantity(quantity);

    product.save().catch(() => next(new DatabaseError(databaseErrors.save)));

    return res.status(200).json({presences: product.presences, quantity: product.quantity});
};

const deleteOneProduct = async (req, res, next) => {
    const barcode = req.params.barcode;

    const product = await models.Product.findOneAndDelete({
        user: req.verifiedToken.id,
        barcode: barcode,
    }).catch(() => next(new DatabaseError(databaseErrors.operation)));

    res.status(200).json({product: product.toJSON()});

};
module.exports = {
    getAllProducts,
    getOneProduct,
    addOneProduct,
    getStats,
    updateOneProductQuantity,
    deleteOneProduct,
};
