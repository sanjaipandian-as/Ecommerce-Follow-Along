const express = require("express");
const { UserModel } = require("../models/userModel");
const ErrorHandler = require("../utils/Errorhandler");
const catchAsyncErrors = require("../middelware/catchAsyncError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../utils/mail");
const upload = require("../middelware/multer");

const userRoute = express.Router();

userRoute.post("/signup", catchAsyncErrors(async (req, res, next) => {
    console.log(req.body);
    const { name, email, password } = req.body;

    if (!email || !password || !name) {
        return next(new ErrorHandler("name, email, and password are required", 400));
    }

    let user = await UserModel.findOne({ email });
    if (user) {
        return next(new ErrorHandler("User is already registered, please login", 400));
    }

    bcrypt.hash(password, 5, async (error, hash) => {
        if (error) {
            return next(new ErrorHandler("Internal server error", 500));
        }

        let newUser = new UserModel({ name, email, password: hash });
        let token = jwt.sign({ id: newUser._id }, process.env.ACCESS);
        let activation_url = `http://localhost:8052/user/activation/${token}`;

        try {
            await sendMail({
                email: newUser.email,
                subject: "Activate your account",
                message: `Hello ${newUser.name}, please click on the link to activate your account: ${activation_url}`,
            });

            await newUser.save();
            res.status(200).json({ status: true, message: "Registration successful, please activate your account" });
        } catch (error) {
            console.log(error);
            return next(new ErrorHandler("Internal server error (Nodemailer)", 500));
        }
    });
}));

userRoute.get("/activation/:token", catchAsyncErrors(async (req, res, next) => {
    let token = req.params.token;
    if (!token) {
        return next(new ErrorHandler("Token not found", 404));
    }

    jwt.verify(token, process.env.ACCESS, async (err, decoded) => {
        if (err) {
            return next(new ErrorHandler("Token is not valid", 400));
        }

        let id = decoded.id;
        await UserModel.findByIdAndUpdate(id, { isActivated: true });
        res.status(200).json({ status: true, message: "Activation is completed" });
    });
}));

userRoute.post("/login", catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler("Email and password are required", 400));
    }

    let user = await UserModel.findOne({ email });
    if (!user || !user.isActivated) {
        return next(new ErrorHandler("Please sign up before logging in", 400));
    }

    let isMatching = await bcrypt.compare(password, user.password);
    if (!isMatching) {
        return next(new ErrorHandler("Password is incorrect", 400));
    }

    let token = jwt.sign({ id: user._id }, process.env.ACCESS, { expiresIn: "30d" });

    res.cookie("accesstoken", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
    });

    res.status(200).json({ status: true, message: "Login successful" });
}));

userRoute.post("/upload", upload.single("photo"), catchAsyncErrors(async (req, res, next) => {
    console.log(req.file);
    console.log(req.body);
    if (!req.file) {
        return next(new ErrorHandler("File not found", 400));
    }

    res.status(200).json({ message: "File uploaded successfully", filePath: `/upload/${req.file.filename}` });
}));

module.exports = { userRoute };
