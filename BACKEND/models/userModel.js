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
    Password:{
        type: String,
        requried:true
    },
    role:{
        type:String,
        default:"user"
    },
    Address:{
        type: addressSchema,

    },
    createAt:{
        type:Date,
        default:Date.now()
    },
    isActivated:{
         type:Boolean,
         default:false
    }
})


const UserModel=mongoose.model("user",userSchema)

module.exports={UserModel}