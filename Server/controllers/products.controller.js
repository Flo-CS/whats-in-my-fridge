// Libraries & cie
const axios = require("axios")

// Utils & cie
const config = require("./../config")

// Models
const Products = require("../models/products.model")
const { response } = require("express")
const productsModel = require("../models/products.model")


const DEFAULT_RANGE = "0-100"
const DEFAULT_SORT = "lastDateModified"

const getAllProducts = async (req, res) => {
    const queryRange = req.query.range || DEFAULT_RANGE
    const querySort = req.query.sort || DEFAULT_SORT

    const rangeStart = parseInt(queryRange.split("-")[0])
    const rangeEnd = parseInt(queryRange.split("-")[1])

    try {
        // TODO : Make the sort order dynamic
        const products = await Products.find().skip(rangeStart).limit(rangeEnd).sort({ [querySort]: "asc" })

        res.status(200).json({ products, })

    } catch (error) {
        res.status(500).json({ error })
    }
}

const getOneProduct = async (req, res) => {
    const paramsBarcode = req.params.barcode

    try {
        const product = await Products.findOne({ barcode: paramsBarcode })
        res.status(200).json({ product })
    }
    catch (error) {
        res.status(500).json({ error })

    }
}

const addOneProduct = async (req, res) => {
    const bodyProduct = req.body

    try {
        // Get all openFoodFacts data for the product with their API
        // TODO : Only get used data
        const productDataResponse = await axios.get(`${config.OPENFOODFACTS_API_ENDPOINT}/product/${bodyProduct.barcode}.json`)
        const productData = await productDataResponse.data.product
        bodyProduct.data = productData

        // Add to mongoDB
        const product = new Products(bodyProduct)
        await product.save()
        res.status(200).json({ product })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error })

    }

}

const getStats = async (req, res) => {
    try {
        const products = await Products.find()
        const totalNumberProducts = products.length

        res.status(200).json({ totalNumberProducts })
    }
    catch (error) {
        res.status(500).json({ error })
    }
}

const updateOneProduct = async (req, res) => {
    const paramsBarcode = req.params.barcode
    const bodyUpdatedProductData = req.body

    try {
        // Use new options to true to return the updated document
        const updatedProduct = await Products.findOneAndUpdate({ barcode: paramsBarcode }, bodyUpdatedProductData, { new: true })
        res.status(200).json({ product: updatedProduct })

    } catch (error) {
        res.status(500).json({ error })

    }
}

const deleteOneProduct = async (req, res) => {
    const paramsBarcode = req.params.barcode

    try {
        const deletedProduct = await Products.findOneAndDelete({ barcode: paramsBarcode })
        res.status(200).json({ product: deletedProduct })
    } catch (error) {
        res.status(500).json({ error })

    }
}
module.exports = { getAllProducts, getOneProduct, addOneProduct, getStats, updateOneProduct, deleteOneProduct }