const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, "uploads/songs");
    },
    filename : (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype == "audio/mpeg"){
        cb(null, true);
    }else{
        cb(new Error("Chỉ cho phép file mp3"), false);
    }
};

const uploads = multer({storage, fileFilter});
module.exports = uploads;