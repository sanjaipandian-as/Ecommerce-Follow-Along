const express = require("express");
const mongoose = require("mongoose");
const productModel = require("../models/productModel");
const userModel = require("../models/userModel");

const auth =require("../middelware/auth")
const catchAsyncError=require("../middelware/catchAsyncError")
const ErrorHandler = require("../utils/errorhadler"); 
const {productUpload} = require("../middelware/multer")
const path = require("path");

const productRouter = express.Router();

productRouter.post(
    "/create-product",
    productUpload.array("images", 10),
    catchAsyncError(async (req, res, next) => {
        const { email, name, description, category, tags, price, stock } = req.body;

        // ✅ Ensure images are uploaded
        if (!req.files || req.files.length === 0) {
            return next(new ErrorHandler("Images are required", 400));
        }

        const images = req.files.map((file) => file.path);

        // ✅ Ensure all fields are present
        if (!email || !name || !description || !category || !tags || !price || !stock) {
            return next(new ErrorHandler("All fields are required", 400));
        }

        // ✅ Ensure `tags` is an array
        const parsedTags = Array.isArray(tags) ? tags : tags.split(",");

        let user = await userModel.findOne({ email });
        if (!user) {
            return next(new ErrorHandler("User does not exist", 404));
        }

        let product = new productModel({
            email,
            name,
            description,
            category,
            tags: parsedTags,
            price,
            images,
            stock,
        });

        await product.save();
        res.status(201).json({ status: true, message: "Product created successfully" });
    })
);

productRouter.get(
    "/allproduct",
    catchAsyncError(async (req, res, next) => {
        let allProduct = await productModel.find();

        if (allProduct && allProduct.length > 0) {
            allProduct = allProduct.map((product) => {
                if (product.images && product.images.length > 0) {
                    product.images = product.images.map((ele) => path.basename(ele));
                }
                return product;
            });
        }

        res.status(200).json({ status: true, message: allProduct });
    })
);

productRouter.get(
    "/product/:id",
    catchAsyncError(async (req, res, next) => {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next(new ErrorHandler("Invalid product ID", 400));
        }

        const product = await productModel.findById(id);

        if (!product) {
            return res.status(404).json({ status: false, message: "Product not found" });
        }

        if (product.images?.length > 0) {
            product.images = product.images.map((ele) => path.basename(ele));
        }

        res.status(200).json({ status: true, message: product });
    })
);


productRouter.delete("/delete/:id",catchAsyncError(async(req,res,next)=>{
    console.log("kjmk")
       let id=req.params.id
       if(!id){
         return next(new ErrorHandler("id is not passed",400))
       }
       if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorHandler("Invalid ObjectId", 400));
       }
       const deletedProduct = await productModel.findByIdAndDelete(id);
       if (!deletedProduct) {
           return next(new ErrorHandler("Product not found", 404));
       }
       res.status(200).json({status:true,message:"deleted successfully"})
       
}))



productRouter.put("/update/:id",productUpload.array("images",10),catchAsyncError(async(req,res,next)=>{
    
    let id=req.params.id
    if(!id){
      return next(new ErrorHandler("id is not passed",400))
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
     return next(new ErrorHandler("Invalid ObjectId", 400));
    }
    
    let { email,name, description,category,tags,price,stock,images} = req.body;
    const imagesArr =req.files.map((file)=>path.basename(file.path));
    console.log(images,imagesArr)
    if(!images){
        images=[]
    }
    else{
        images =Array.isArray(images)?images:[images]
    }
    console.log(images,imagesArr,"88")
    const updated =await productModel.findByIdAndUpdate(id,{ email,name, description,category,tags,price,stock,images:[...imagesArr,...images]},{new:true})
    res.status(200).json({status:true,message:"updated successfully",data:updated})
    
}))

productRouter.post(
    "/cart",
    auth,
    catchAsyncError(async (req, res, next) => {
        const { productId, quantity } = req.body;
        let user_id = req.userID; // ✅ Fixed undefined variable

        if (!user_id) {
            return next(new ErrorHandler("User ID is required", 400));
        }

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return next(new ErrorHandler("Invalid product ID", 400));
        }

        if (!quantity || quantity < 1) {
            return next(new ErrorHandler("Quantity must be at least 1", 400));
        }

        const user = await userModel.findById(user_id);
        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }

        const product = await productModel.findById(productId);
        if (!product) {
            return next(new ErrorHandler("Product not found", 404));
        }

        const cartItemIndex = user.cart.findIndex(
            (item) => item.productId.toString() === productId
        );

        if (cartItemIndex > -1) {
            user.cart[cartItemIndex].quantity += quantity;
        } else {
            user.cart.push({ productId, quantity });
        }

        await user.save();

        res.status(200).json({
            status: true,
            message: "Cart updated successfully",
            cart: user.cart,
        });
    })
);

productRouter.get(
    "/cart",
    auth,
    catchAsyncError(async (req, res, next) => {
        let userID = req.userID; // ✅ Fixed variable name

        if (!userID) {
            return next(new ErrorHandler("User ID is required", 400));
        }

        if (!mongoose.Types.ObjectId.isValid(userID)) {
            return next(new ErrorHandler("Invalid user ID", 400));
        }

        let userCart = await userModel.findById(userID).populate({
            path: "cart.productId",
            model: productModel, // ✅ Fixed model reference
        });

        if (!userCart) {
            return next(new ErrorHandler("User not found", 404));
        }

        res.status(200).json({ status: true, message: userCart.cart });
    })
);






module.exports = productRouter;
