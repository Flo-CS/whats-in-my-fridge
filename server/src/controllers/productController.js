const models = require("../models");
const {validationErrors} = require("../helpers/errors");
const {databaseErrors} = require("../helpers/errors");
const {ValidationError} = require("../helpers/errors");
const {DatabaseError} = require("../helpers/errors");
const {ProductsStats} = require("../helpers/productsStats");
const asyncHandler = require("express-async-handler")

const getAllProducts = asyncHandler(async (req, res) => {
    const products = await models.Product.find({
        user: req.verifiedToken.id,
    }).catch(() => {
        throw new DatabaseError(databaseErrors.operation)
    })
    return res.status(200).json({products: products.map(product => product.toJSON())});

});

const getOneProduct = asyncHandler(async (req, res) => {

    const barcode = req.params.barcode;
    const product = await models.Product.findOne({
        user: req.verifiedToken.id,
        barcode: barcode,
    }).catch(() => {
        throw new DatabaseError(databaseErrors.operation)
    })
    return res.status(200).json({product: product.toJSON()});
})

const addOneProduct = asyncHandler(async (req, res) => {
    const barcode = req.params.barcode;

    // UPDATE PRODUCT QUANTITY IF PRODUCT ALREADY EXISTS
    // TODO : Remove that and handle it on frontend ??
    const productToUpdate = await models.Product.findOne({
        user: req.verifiedToken.id,
        barcode: barcode,
    }).catch(() => {
        throw new DatabaseError(databaseErrors.operation)
    })

    if (productToUpdate) {
        productToUpdate.updateQuantity(productToUpdate.quantity + 1);
        await productToUpdate.save().catch(() => {
            throw new DatabaseError(databaseErrors.save)
        })
        return res.status(200).json({product: productToUpdate.toJSON(), updated: true});
    }

    // CREATE NEW PRODUCT IF PRODUCT NOT EXISTS
    const productToCreate = await models.Product.createFromOFFData(barcode, req.verifiedToken.id).catch((e) => {
        throw e
    })

    await productToCreate.save().catch(() => {
        throw new DatabaseError(databaseErrors.save)
    })

    return res.status(200).json({product: productToCreate.toJSON(), updated: false});
})

const getStats = asyncHandler(async (req, res) => {
    const {startDate, timeGranularity} = req.body;

    const products = await models.Product.find({user: req.verifiedToken.id})
        .catch(() => {
            throw new DatabaseError(databaseErrors.operation)
        })


    const stats = new ProductsStats(products, startDate, timeGranularity).getStats();


    return res.status(200).json({stats});

})

const updateOneProductQuantity = asyncHandler(async (req, res) => {
    const barcode = req.params.barcode;
    const quantity = req.body.quantity;


    const product = await models.Product.findOne(
        {user: req.verifiedToken.id, barcode: barcode}
    ).catch(() => {
        throw new DatabaseError(databaseErrors.operation)
    });

    if (quantity < 0)
        throw new ValidationError(validationErrors.quantityLowerThanZero)

    product.updateQuantity(quantity);

    product.save().catch(() => {
        throw new DatabaseError(databaseErrors.save)
    });

    return res.status(200).json({presences: product.presences, quantity: product.quantity});
})

const deleteOneProduct = asyncHandler(async (req, res) => {
    const barcode = req.params.barcode;

    const product = await models.Product.findOneAndDelete({
        user: req.verifiedToken.id,
        barcode: barcode,
    }).catch(() => {
        throw new DatabaseError(databaseErrors.operation)
    });

    res.status(200).json({product: product.toJSON()});

})

module.exports = {
    getAllProducts,
    getOneProduct,
    addOneProduct,
    getStats,
    updateOneProductQuantity,
    deleteOneProduct,
};
