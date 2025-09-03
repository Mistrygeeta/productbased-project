const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");



router.post("/user/register", authController.registerUser)
router.post("/user/login", authController.loginUser)

router.post("/seller/register", authController.registerSeller)
router.post("/seller/login", authController.loginSeller)


module.exports = router;