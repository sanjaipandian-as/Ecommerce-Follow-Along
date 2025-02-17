const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;
console.log("MongoDB URI from .env:", process.env.MONGO_URI);


const connectDB = async () => {
    if (!MONGO_URI) {
        throw new Error("❌ MongoDB URI is missing. Check your .env file.");
    }

    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.error("MongoDB Connection Failed:", error);
        process.exit(1); // Exit if connection fails
    }
};

module.exports = connectDB;
