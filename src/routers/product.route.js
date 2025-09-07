const express  = require ("express")
const authMiddleware = require("../middlewares/auth.middleware")
const productController = require("../controllers/product.controller")
const multer = require("multer")


const upload = multer({
    storage : multer.memoryStorage()
})

const router = express.Router()

router.post("/",authMiddleware.authSeller,
    upload.array("images", 5),
    productController.createProduct
)

// get /seller

router.get("/seller",
    authMiddleware.authSeller,
    productController.getSellerProduct
)

router.get("/", productController.getAllProducts)

router.get("/product-details/:id",productController.getProductDetails)

module.exports = router