const express = require("express");
const authController = require("../controllers/auth.controller");
const {authUser} = require("../middlewares/auth.middleware")


const router = express.Router();

router.get("/me",authUser, (req, res)=>{
    return res.status(200).json({
        message: "user logged in", 
        user: req.user
    })
})

router.post("/user/register", authController.registerUser)
router.post("/user/login", authController.loginUser)

router.post("/seller/register", authController.registerSeller)
router.post("/seller/login", authController.loginSeller)


module.exports = router;