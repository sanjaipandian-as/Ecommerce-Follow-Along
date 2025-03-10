const mongoose=require("mongoose")

const addressSchema =mongoose.Schema({
   
   Country:{
        type:String,
        required:true
   },
   State:{
       type:String,
       required:true
   },
   Pincode:{
      type:Number,
      required:true   
   },
   Houseno:{
    type:Number,
     required:true
   },

   
})

const cartSchema = mongoose.Schema({

    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "product",
        required: true
    },

    quantity: {
        type: Number,
        required: true,
        min:[1,"Quantity cannot be less than 1"],
        default: 1,
    },


})




const userSchema=mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required:true
    },
    role:{
        type:String,
        default:["user","seller","admin"]     
    },
    Address:{
        type: addressSchema

    },
    createAt:{
        type:Date,
        default:Date.now()
    },
    isActivated:{
         type:Boolean,
         default:false
    },
    cart: [cartSchema]
})






const UserModel=mongoose.model("user",userSchema)

module.exports= UserModel