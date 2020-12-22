const multer = require("multer");
const option = multer.diskStorage({
    destination: function(req , file , cb){
        cb(null , "public/UploadProfile")

    },
    filename: function(req , file , cb){
        cb(null , Date.now() + "_" + file.originalname);
    }
})
    const UploadProfile = multer({storage: option}).single("fileUploadProfile")

    module.exports = UploadProfile;