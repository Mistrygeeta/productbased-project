const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


async function registeUser(req,res) {
    const {username, fullname :{firstname,lastname}, email, password}= req.body
    const isUserAlreadyExist = await userModel.findOne({
        $or : [{username},{email}]
    })

    if(isUserAlreadyExist){
        return res.status(422).json({
                message: isUserAlreadyExist.username === username ? "username is already exist" : "email already exist"
        })
    }

    const hashedpassword = await bcrypt.hash(password,10)
    const user = await userModel.create({
        username, fullname:{
            firstname,
            lastname
        },
        email,
        password : hashedpassword
    })

    const token = jwt.sign({id: user._id},process.env.JWT_SECRET)
    res.cookie("token", token)

    res.status(201).json({
        message : "user registered successfully",
        user : {
            id: user._id,
            username : user.username,
            fullname: user.fullname,
            email : user.email, 
        }
    })
}


async function loginUser(req, res) {
    const {username, email , password} = req.body

    const user  = await userModel.findOne({
        $or :[{username}, {email}]
    })

    if(!user){
        return res.status(400).json({
            message : "Invalid credientials"
        })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!isPasswordValid){
        return res.status(400).json({
            message : "Invalid credentials"
        })
    }
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
    res.cookie("token", token)
    
    res.status(200).json({
        message : "user logged in successfully",
        user:{
            id: user._id,
            username : user.username,
            fullname: user.fullname,
            email : user.email, 
        }
    })
}

module.exports ={registeUser, loginUser}