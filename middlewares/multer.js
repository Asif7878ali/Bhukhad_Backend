// multer.js
const multer = require('multer');

const storage = multer.memoryStorage(); // Store the image in memory
const upload = multer({ storage });

module.exports = upload;
