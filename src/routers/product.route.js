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



module.exports = router