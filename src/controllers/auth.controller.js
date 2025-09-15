const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


async function registerUser(req,res) {
    const {username, fullname :{firstname,lastname}, email, password,role}= req.body
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
        username, 
        fullname:{
            firstname,
            lastname
        },
        email,
        password : hashedpassword,
        role,
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
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET,{
        expiresIn: "1h",
    });
    res.cookie("token", token,{
        httpOnly: true,
        sameSite: "none",
        secure: "none"
    })
    
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

async function registerSeller(req, res) {
//     const {username, fullname:{firstname,lastname}, email, password} = req.body
    
//     const isSellerAlreadyExist = await userModel.findOne({
//         $or : [{username},{email}]
//     })

//     if(isSellerAlreadyExist){
//         return res.status(422).json({
//             message : isSellerAlreadyExist.username == username ? "username already exists" : " email already exists"
//         })
//     }
 
//     const hashedpassword = await bcrypt.hash(password,10)

//     const seller = await userModel.create({
//         username,
//         fullname :{firstname,lastname},
//         email,
//         password: hashedpassword,
//         role :"seller"
//     })

//     const token = jwt.sign({id: seller._id},process.env.JWT_SECRET)
//     res.cookie("token", token)

//     res.status(201).json({
//         message : "seller registered successfully",
//         seller :{
//             id: seller._id,
//             username : seller.username,
//             fullname: seller.fullname,
//             email : seller.email
//         }
//     })

const  seller = await userModel.findByIdAndUpdate(req.user.id,{
    role: "seller"
});

res.status(200).json({
    message : "seller updated",
    seller:{
        id: seller._id,
        username: seller.username,
        fullname: seller.fullname,
        email: seller.email,
        role: seller.role
    }
});
};


async function logoutUser(req, res) {
try {
    const token = req?.cookies?.token
    console.log(token)
    if(!token){
        res.status(404).json({
            message: "token not found"
        })
    }

    res.clear.cookie("token")
    return res.status(200).json({
        message: "user loggedout successfully"
    })
} catch (error) {
    console.log(error)
    return res.status(400).json({
        message: "error in logout",
        error: error
    })
    
}
    
}

// async function loginSeller(req, res) {
//     const { username, email, password} = req.body;

//     const seller = await userModel.findOne({
//         $or: [{username},{email}]
//     })

//     if(!seller){
//         return res.status(400).json({
//             message : "Invalid credentials"
//         })
//     }
    
//     const isPasswordValid = await bcrypt.compare(password, seller.password)

//     if(!isPasswordValid){
//         return res.status(409).json({
//             message : " Invalid credentials"
//         })
//     }

//     const token = jwt.sign({id:seller._id}, process.env.JWT_SECRET)
//     res.cookie("token", token);

//     res.status(200).json({
//         message : "seller logged in successfully",
//         seller :{
//             id: seller._id,
//             username : seller.username,
//             fullname: seller.fullname,
//             email : seller.email
//         }
//     })
// }

module.exports ={registerUser, loginUser , registerSeller,logoutUser,
}