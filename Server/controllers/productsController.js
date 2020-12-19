const productsModel = require("./../models/productsModel")
const Products = require("./../models/productsModel")


const getAllProducts = async (req, res) => {
    const queryRange = req.query.range || "0-100"
    const querySort = req.query.sort || "lastDateAdded"

    const rangeStart = parseInt(queryRange.split("-")[0])
    const rangeEnd = parseInt(queryRange.split("-")[1])    

    try {
        const products = await Products.find().skip(rangeStart).limit(rangeEnd).sort({[querySort]:"asc"})
        const totalNumberProducts = await Products.countDocuments() 

        res.status(200).send({ rangeStart, rangeEnd,totalNumberProducts,  products, })

    } catch (error) {
        res.status(500).send({error: error})
    }
  


}

module.exports = { getAllProducts }