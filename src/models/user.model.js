const mongoose = require("mongoose")



const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique: true
    },
    fullname: {
        firstname:{
            type: String,
            required: true
        },
        lastname:{
            type: String
        }
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String
    },
    cart:{
        type:[],
        ref: "product"
    },
    role: {
        type: String,
        enum :["user", "seller"],
        default : "user"
    }
})


const userModel = mongoose.model("user", userSchema);

module.exports = userModel;