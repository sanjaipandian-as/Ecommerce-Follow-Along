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
userRoute.post('/login', catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler("Email and password are required", 400));
    }

    let user = await UserModel.findOne({ email });
    if (!user) {
        return next(new ErrorHandler("Please sign up before login", 400));
    }
    if (!user.isActivated) {
        return next(new ErrorHandler("Please activate your account before login", 400));
    }

    await bcrypt.compare(password, user.password, function(err, result) {
        if (err) {
            return next(new ErrorHandler("Internal server error", 400));
        }
    });
    if (!result) {
        return next(new ErrorHandler("Incorrect password", 400));
    }
    

    let token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: '30d' });
    res.cookie("accesstoken", token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    });

    res.status(200).json({ status: true, message: "Login successful" });
}));

// FILE UPLOAD ROUTE
userRoute.post("/upload", upload.single("photo"), catchAsyncError(async (req, res, next) => {
    if (!req.file) {
        return next(new ErrorHandler("File not found", 400));
    }
    res.status(200).json({ status: true, message: "File uploaded successfully" });
}));

module.exports = { userRoute };