const { app } = require("./app"); 
require("dotenv").config(); 
const connection = require("./db/connection");

const PORT = process.env.PORT || 5000; // Default to 5000 if PORT is not set

// Test route
app.get("/test", (req, res) => {
    res.send("Server is running...");
});

// Start the server after ensuring DB connection
connection.then(() => {
    app.listen(PORT, () => {
        console.log(` Server running at http://localhost:${PORT}`);
    });
}).catch((error) => {
    console.error(" Database connection failed:", error);
});
