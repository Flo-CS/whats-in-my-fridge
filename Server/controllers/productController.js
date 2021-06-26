const models = require("./../models/index");
const {getOFFdata} = require("../helpers/product");
const {ProductsStats} = require("../helpers/productsStats");


const getAllProducts = async (req, res) => {

    const range = req.query.range || "0-100";

    const rangeStart = parseInt(range.split("-")[0]);
    const rangeEnd = parseInt(range.split("-")[1]);


    try {
        let products = await models.Product.find({
            user: req.verifiedToken.id,
        }).skip(rangeStart)
            .limit(rangeEnd);

        res.status(200).json({products: products.map(product => product.export())});
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

        res.status(200).json({product: product.export()});

    } catch (error) {
        res.status(500).json({error});
    }
};

const addOneProduct = async (req, res) => {
    const barcode = req.params.barcode;

    try {

        const productToUpdate = await models.Product.findOne(
            {
                user: req.verifiedToken.id,
                barcode: barcode,
            }
        );
        // UPDATE PRODUCT QUANTITY IF PRODUCT ALREADY EXISTS
        if (productToUpdate) {
            productToUpdate.updateQuantity(productToUpdate.quantity + 1)
            productToUpdate.save()


            return res.status(200).json({product: productToUpdate.export(), updated: true});
        }

        // CREATE NEW PRODUCT IF PRODUCT NOT EXISTS
        let productData = await getOFFdata(barcode);

        if (!productData) return res.status(404).json({});


        const productToCreate = new models.Product({
            user: req.verifiedToken.id,
            barcode: barcode,
            data: productData,
        });


        await productToCreate.save();


        res.status(200).json({product: productToCreate.export(), updated: false});
    } catch (error) {
        res.status(500).json({error});
    }
};

const getStats = async (req, res) => {
    const {startDate, endDate, timeUnit} = req.query;

    try {
        const products = await models.Product.find({user: req.verifiedToken.id});

        const stats = new ProductsStats(products, startDate, endDate, timeUnit).getStats();

        res.status(200).json({stats});
    } catch (error) {
        console.log(error);
        res.status(500).json({error});
    }
};

const updateOneProductQuantity = async (req, res) => {
    const barcode = req.params.barcode;
    const quantity = req.body.quantity;

    try {
        const product = await models.Product.findOne(
            {user: req.verifiedToken.id, barcode: barcode}
        );

        if (quantity < 0) return res.status(400).json();

        product.updateQuantity(quantity)
        product.save()

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

        res.status(200).json({product: product.export()});
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
