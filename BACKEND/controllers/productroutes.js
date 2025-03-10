let express = require("express");
const productModel = require("../models/productModel");

const userModel=require("../models/userModel")
const catchAsyncError = require("../middelware/catchAsyncError");

const ErrorHandler=require("../utils/Errorhandler") // ✅ Fixed typo
const { productUpload } = require("../middelware/multer");
let path = require("path");

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

        // ✅ Ensure `tags` is an array (in case it's sent as a string)
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

productRouter.get("/allproduct", catchAsyncError(async(req, res, next)=>{
      
    let allProduct = await productModel.find()

    if (allProduct && allProduct.length > 0) { 
       allProduct = allProduct.map((product) => {
           if (product.images && product.images.length > 0) {
               product.images = product.images.map((ele) => path.basename(ele));
           }
           return product; 
       });
   }
     
    res.status(200).json({status:true,message:allProduct})


}))

productRouter.get("/product/:id", catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    
    // Find the product by ID
    const product = await productModel.findById(id);
    
    if (!product) {
        return res.status(404).json({ status: false, message: "Product not found" });
    }

    // Process images if available
    if (product.images?.length > 0) {
        product.images = product.images.map((ele) => path.basename(ele));
    }

    res.status(200).json({ status: true, message: product });
}));

module.exports = productRouter;
