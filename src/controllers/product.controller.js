const productModel = require("../models/product.model");
const storageService = require("../services/storage.service")


async function createProduct(req, res) {
    const {title, description , price, stock} = req.body;
    const files = await Promise.all(req.files.map(async function (file) {
        return await storageService.uploadFile(file.buffer)
    }))
     const seller = req.seller

     const realPrice = JSON.parse(price)

     const product = await productModel.create({
        title,
        description,
        price:{
          amount:realPrice.amount,
          currency : realPrice.currency
        },
        images :files.map(file=>file.url),
        seller: seller._id,
        stock: parseInt(stock)
     })

     res.status(201).json({
        message: "product created successfully",
        product
     })
}
module.exports = {createProduct}