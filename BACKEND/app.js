const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
const ErrorMiddleware = require("./middelware/error");
const path = require("path");

const { userRoute } = require("./controllers/userRoute");
const productRouter = require("./controllers/productRoutes");

app.use(
  cors({
    origin: "http://localhost:5173", // Remove trailing slash
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/test", async (req, res) => {
  res.send("hellodude.......");
});

console.log(path.join(__dirname, "uploadproducts"));

app.use("/profile-photo", express.static(path.join(__dirname, "uploads")));
app.use("/products-photo", express.static(path.join(__dirname, "uploadproducts")));

app.use("/user", userRoute);
app.use("/product", productRouter);

app.use(ErrorMiddleware);

module.exports = { app };