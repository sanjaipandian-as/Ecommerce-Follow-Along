const multer = require("multer");
const path = require("path");

// ✅ Define User Upload Storage
const storage = multer.diskStorage({
    destination: path.join(__dirname, "../upload"), // Directly specify the path
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random());
        cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
    }
});

// ✅ Define Product Upload Storage
const productStorage = multer.diskStorage({
    destination: path.join(__dirname, "../uploadproducts"), // Directly specify the path
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random());
        cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
    }
});

// ✅ Define Upload Instances
const upload = multer({ storage: storage });
const productUpload = multer({ storage: productStorage });

module.exports = { upload, productUpload };
