const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { verifyToken } = require("../middleware/Auth");

const {
  addbanner,
  updateBanner,
  deleteBanner,
  getAllBanners,
} = require("../controllers/bannerController");

cloudinary.config({
  cloud_name: "dcfm0aowt",
  api_key: "576798684156725",
  api_secret: "bhhXx57-OdaxvDdZOwaUKNvBXOA"
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "banner",
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
const upload = multer({ storage: storage });

router.post("/addBanner", upload.single("banner"), addbanner);
router.post(
  "/updateBanner",
  upload.single("banner"),
  updateBanner
);
router.delete("/deleteBanner", deleteBanner);
router.get("/getAllBanners", getAllBanners);
module.exports = router;
