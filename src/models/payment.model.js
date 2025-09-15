const mongoose = require("mongoose");


const paymentSchema = new mongoose.Schema({
product_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref : "product",
    required : true
},
amount:{
    type: Number,
    required: true
},
currency:{
    type: String,
    required: true
},
status:{
    type: String,
    enum :["PENDING","SUCCESS","FAILED"],
    required: true
},
user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
},
order_id:{
    type: String
},
payment_id:{
    type: String,
},
signature:{
    type : String
}
})


const paymentModel = mongoose.model("payment", paymentSchema);

module.exports = paymentModel;