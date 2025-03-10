const express = require('express');
const cors = require('cors');
const path = require('path');
const ErrorMiddleware = require('./middelware/error');

const app = express();

// Fix: Use correct middleware setup
app.use(express.json());

// Enable CORS
app.use(cors({
    origin: '*',
    credentials: true
}));

// Import Routes
const userRoute = require('./controllers/userRoute');
const productRoute = require('./controllers/productRoutes');

// Static file serving
app.use('/profile-photo', express.static(path.join(__dirname, 'uploads')));
app.use('/products-photo', express.static(path.join(__dirname, 'uploadproducts')));

// Test Route
app.get("/test", (req, res) => {
    res.send("Server is running...");
});

// Use Routes
app.use('/user', userRoute);
app.use('/product', productRoute);

// Error Handling Middleware
app.use(ErrorMiddleware);

module.exports = { app };
