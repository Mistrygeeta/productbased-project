const productModel = require("../models/product.model");
const storageService = require("../services/storage.service")


async function createProduct(req, res) {
    const {title, description , price, stock,images} = req.body;
    console.log("this way-->",title, req.files)
    const files = await Promise.all(req.files.map(async function (file) {
        return await storageService.uploadFile(file.buffer)
    }))
     const seller = req.seller

     const realPrice = price

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


async function getSellerProduct(req, res) {
    const seller = req.seller;

    const product = await productModel.find({
        seller : seller._id
    })

    res.status(200).json({
        message : "seller product fetched successfully",
        product
    })
    
}

async function getAllProducts(req, res) {
    const products = await productModel.find().populate("seller")

    res.status(200).json({
        message: "All products fetched successfully",
        products
    })
}


async function getProductDetails(req, res) {
    const productId = req.params.id

    const product = await productModel.findOne({
        _id: productId
    })
    res.status(200).json({
        message : "product details fetch successfully",
        product
    })
    
}
module.exports = {createProduct, getSellerProduct, getAllProducts,getProductDetails}