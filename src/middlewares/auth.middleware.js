const userModel = require ("../models/user.model")
const jwt = require("jsonwebtoken")

async function authSeller(req, res , next) {
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message: "unauthorized"
        })
    }

    try {
        const decoded= jwt.verify(token, process.env.JWT_SECRET)

        const user = await userModel.findById(decoded._id)

        if(user.role !== "seller"){
            return res.status(403).json({
                message : "forbidden, you don't have the required role"
            })
        }
        req.seller = user

        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({
            message: "unauthorized"
        })
    }
  
    
}

async function authUser(req, res, next) {
    const token = req.cookies.token;

    try {
        if(!token){
            return res.status(401).json({
                message: "token not found ! unauthorized user"
            })
        }
    const decoded= jwt.verify(token,process.env.JWT_SECRET)

    const user = await userModel.findById(decoded.id)
    if(!user){
        return res.status(404).json({
            message : "user not found"
        })
    }

    req.user = user;
    next()
    } catch (error) {
        console.log("error in auth middleware", error.message)
    }
}

module.exports = {authSeller, authUser}