const multer = require('multer');

module.exports = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "store/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
