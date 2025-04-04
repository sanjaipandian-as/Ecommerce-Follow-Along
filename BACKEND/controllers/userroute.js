const express = require("express");
const UserModel = require("../models/userModel");
const ErrorHandler = require("../utils/Errorhandler");
const catchAsyncError = require("../middelware/catchAsyncError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../utils/mail");
const { upload } = require("../middelware/multer");

const userRoute = express.Router();

// SIGNUP ROUTE
userRoute.post("/signup", catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return next(new ErrorHandler("Name, email, and password are required", 400));
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
        return next(new ErrorHandler("User already exists, please login", 400));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ name, email, password: hashedPassword, isActivated: false });
    const token = jwt.sign({ id: newUser._id }, process.env.SECRET, { expiresIn: "1h" });
    const activation_url = `http://localhost:${process.env.PORT}/user/activation/${token}`;

    try {
        await sendMail({
            email: newUser.email,
            subject: "Activate your account",
            message: `Hello ${newUser.name}, please click the link to activate your account: ${activation_url}`,
        });

        await newUser.save();
        res.status(200).json({ status: true, message: "Registration successful. Please activate your account." });
    } catch (error) {
        return next(new ErrorHandler("Internal server error while sending email", 500));
    }
}));

// ACCOUNT ACTIVATION ROUTE
userRoute.get("/activation/:token", catchAsyncError(async (req, res, next) => {
    let token = req.params.token;
    if (!token) {
        return next(new ErrorHandler("Token not found", 400));
    }

    jwt.verify(token, process.env.SECRET, async (err, decoded) => {
        if (err) {
            return next(new ErrorHandler("Token expired or invalid", 400));
        }

        let id = decoded.id;
        const updatedUser = await UserModel.findByIdAndUpdate(id, { isActivated: true }, { new: true });

        if (!updatedUser) {
            return next(new ErrorHandler("User not found", 404));
        }

        res.status(200).json({ status: true, message: "Account activated successfully!" });
    });
}));

// LOGIN ROUTE
userRoute.post("/login", catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler("Email and password are required", 400));
    }

    let user = await UserModel.findOne({ email });
    if (!user) {
        return next(new ErrorHandler("Please sign up first", 400));
    }

    if (!user.isActivated) {
        return next(new ErrorHandler("Please activate your account before logging in", 400));
    }

    bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
            return next(new ErrorHandler("Internal server error", 500));
        }

        if (!result) {
            return next(new ErrorHandler("Password is incorrect", 400));
        }

        let token = jwt.sign({ id: user._id }, process.env.SECRET, {
            expiresIn: "30d"
        });

        res.cookie("accessToken", token, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        });

        res.status(200).json({ status: true, message: "Login successful" });
    });
}));

// FILE UPLOAD ROUTE
userRoute.post("/upload", upload.single("photo"), catchAsyncError(async (req, res, next) => {
    if (!req.file) {
        return next(new ErrorHandler("File not found", 400));
    }
    res.status(200).json({ status: true, message: "File uploaded successfully" });
}));


userRoute.post("/login",catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    console.log(email)
    if (!email || !password) {
      return next(new ErrorHandler("email and password are reqires", 400));
    }

    let user = await UserModel.findOne({ email });

    if (!user) {
      return next(new ErrorHandler("Please Signup", 400));
    }

    if(!user.isActivated){
      return next(new ErrorHandler("Please Signup", 400));
    }

    await bcrypt.compare(password, user.password, function(err, result) {
      if(err){
       return  next(new ErrorHandler("internal server error", 500));
      }
      if(!result){
        return next(new ErrorHandler("password is incorrect", 400));
      }

      let token = jwt.sign({ id: user._id }, process.env.SECRET, {
        expiresIn: 1000 * 60 * 60 * 60 *24,
      });
      res.cookie("accesstoken", token, {
        httpOnly: true,
        secure: false, 
        sameSite: "lax"
      });
      

      res.status(200).json({status:true,message:"login successful",token})

      
    });
  }));


  userRoute.get("/checklogin",auth,catchAsyncError(async (req, res, next) => {
       
    let userId=req.user_id
    if(!userId){
      return next(new ErrorHandler("user id not found", 400));
    }
    let user=await UserModel.findById(userId).select("name email role address profilePhoto");
    res.status(200).json({status:true,message:user})
  }));

  userRoute.put("/add-address", auth, catchAsyncError(async (req, res, next) => {
    console.log("hello")
    let userId = req.user_id
    if (!userId) {
      return next(new ErrorHandler("user id not found", 400));
    }
    const { country, city, address, pincode, addressType } = req.body
  
    if (!country || !city || !address || !pincode || !addressType) {
      return next(new ErrorHandler("country,city,address,pincode,addressType all feilda are required", 400));
    }
    let user = await UserModel.findByIdAndUpdate(userId,
      { $push: { address: req.body } },
      { new: true })
    res.status(200).json({ status: true, message: user })
  }));
  
  
  userRoute.post("/order", auth, catchAsyncError(async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      let userId = req.user_id
     
      if (!userId) {
        return next(new ErrorHandler("user id not found", 400));
      }
      let user =await UserModel.findById(userId)
      let mailId = user.email
      let userName = user.name
      const { orderItems, shippingAddress, totalAmount } = req.body
      if (!Array.isArray(orderItems) || orderItems.length === 0) {
        return next(new ErrorHandler("At least one order item is required", 400));
      }
      for (let item of orderItems) {
        if (!item.product || !item.quantity || !item.price) {
          return next(new ErrorHandler("Each order item must include product, quantity, and price", 400));
        }
        if (item.quantity < 1) {
          return next(new ErrorHandler("Quantity cannot be less than 1", 400));
        }
        if (item.price < 0) {
          return next(new ErrorHandler("Price cannot be negative", 400));
        }
      }
  
      if (!shippingAddress ||
        !shippingAddress.country ||
        !shippingAddress.city ||
        !shippingAddress.address ||
        !shippingAddress.pincode ||
        !shippingAddress.addressType) {
        return next(new Errorhadler("All shipping address fields are required (country, city, address, pincode, addressType)", 400));
      }
  
      if (typeof totalAmount !== "number" || totalAmount <= 0) {
        return next(new ErrorHandler("Total amount must be a positive number", 400));
      }
  
      let newOrder = new orderModel({
        orderItems,
        shippingAddress,
        totalAmount,
        user: userId,
      });
      console.log(mailId)
      await newOrder.save({ session });
      await UserModel.findByIdAndUpdate(userId, { cart: [] }, { session })
      
  
      await sendMail(
        {
          email: mailId,
          subject: "order placed successfully",
          message: `Hello ${userName},your order placed successfully, `,
        }
      )
      await session.commitTransaction();
      session.endSession();
  
      res.status(201).json({
        success: true,
        message: "Order placed successfully"
      });
  
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      return next(new ErrorHandler(error.message, 400));
    }
  }));
  


// ✅ Export correctly (No {} destructuring)
module.exports = {userRoute};
