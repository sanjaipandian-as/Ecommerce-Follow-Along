module.exports = (err, req, res, next) => {
    // Set default error message and status code if not provided
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;

    // Send JSON response with status code and error message
    res.status(err.statusCode).json({
        status: false,
        message: err.message
    });
};
