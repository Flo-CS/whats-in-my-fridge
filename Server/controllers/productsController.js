const productsModel = require("./../models/productsModel")
const Products = require("./../models/productsModel")

const DEFAULT_RANGE = "0-100"
const DEFAULT_SORT = "lastDateAdded"

const getAllProducts = async (req, res) => {
    const queryRange = req.query.range || DEFAULT_RANGE
    const querySort = req.query.sort || DEFAULT_SORT

    const rangeStart = parseInt(queryRange.split("-")[0])
    const rangeEnd = parseInt(queryRange.split("-")[1])

    try {
        const products = await Products.find().skip(rangeStart).limit(rangeEnd).sort({ [querySort]: "asc" })
        const totalNumberProducts = await Products.countDocuments()

        res.status(200).send({ rangeStart, rangeEnd, totalNumberProducts, products, })

    } catch (error) {
        res.status(500).send({ error })
    }
}

const getOneProduct = async (req, res) => {
    const paramsBarcode = req.params.barcode

    try {
        const product = await Products.findOne({ barcode: paramsBarcode })
        res.status(200).send({ product })
    }
    catch (error) {
        res.status(500).send({ error })

    }
}

const getStats = async (req, res) => {
    try {
        const products = await Products.find()
        // TODO
    }
    catch (error) {
        res.status(500).send({ error })
    }
}

const updateOneProductData = async (req, res) => {
    const paramsBarcode = req.params.barcode
    const bodyUpdatedProductData = req.body

    try {
        // Use new options to true to return the updated document
        const updatedProduct = await Products.findOneAndUpdate({ barcode: paramsBarcode }, bodyUpdatedProductData, { new: true })
        res.status(200).send({ product: updatedProduct })

    } catch (error) {
        res.status(500).send({ error })

    }
}

const deleteOneProduct = async (req, res) => {
    const paramsBarcode = req.params.barcode

    try {
        const deletedProduct = await Products.findOneAndDelete({ barcode: paramsBarcode })
        res.status(200).send({ product: deletedProduct })
    } catch (error) {
        res.status(500).send({ error })

    }
}
module.exports = { getAllProducts, getOneProduct, getStats, updateOneProductData, deleteOneProduct }