const multer = require("multer");
const option = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public/Upload");
    },
    filename: function(req , file , cb){
        cb(null , Date.now() + "_" + file.originalname);
    }
})

const upload = multer({storage: option}).single("filetoupload")

module.exports = upload;
