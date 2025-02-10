const express = require('express');
const {registerUser, loginUser , logout, getalluser, getUser, deleteUser, UpdateUser, checkAuth, updateRole, updateProfile } = require('../controllers/AuthController');
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const routes = express.Router();
const {verifyToken} = require('../middleware/Auth') 
const {isAdmin} = require('../middleware/Auth') 
 
cloudinary.config({
  cloud_name: 'dckm6ymoh', 
  api_key: '135976658793743', 
  api_secret: 'gcNtD98BggiJeAerUCFcXCFCA2g'
  });
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "user",
      allowed_formats: ["jpg", "png", "jpeg", "webp"],
      transformation: [
        {
          crop: "fill",
          gravity: "center",
          quality: "auto:best", // Automatically optimizes quality while maintaining visual fidelity
        },
      ],
    },
  });
  const upload = multer({
    storage: storage,
  });

routes.post('/registerUser',registerUser);
routes.post('/loginUser',loginUser);

routes.get('/logout',logout);
routes.get('/getalluser',getalluser);
routes.get('/getUser',verifyToken,getUser);
routes.post(
    "/updateProfile",
    verifyToken,
    upload.single("profilePic"),
    updateProfile
  );
routes.delete('/deleteUser',deleteUser);
routes.put('/updateUser',UpdateUser);
routes.get('/checkAuth',checkAuth);    
routes.put('/updateRole',updateRole);    
    
module.exports = routes


