const multer = require("multer");

const storage = multer.memoryStorage(); // Store the image in memory for cloud upload

const upload = multer({ storage });

module.exports = upload;
