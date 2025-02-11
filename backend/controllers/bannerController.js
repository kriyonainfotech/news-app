const Banner = require("../models/banner");
const cloudinary = require("cloudinary").v2;
const mongoose = require("mongoose");

const getPublicIdFromUrl = (url) => {
  const regex = /\/(?:v\d+\/)?([^\/]+)\/([^\/]+)\.[a-z]+$/;
  const match = url.match(regex);
  if (match) {
    return `${match[1]}/${match[2]}`; // captures the folder and file name without versioning or extension
  }
  return null;
};

const addbanner = async (req, res) => {
  try {
    const imageUrl = req.file.path; // or req.file.path if using multer
    const { title } = req.body; // Fix here

    console.log(imageUrl, "image banner");

    // Create and save a new Banner instance
    const newBanner = new Banner({ title, imageUrl });
    await newBanner.save();

    return res.status(200).send({
      success: true,
      message: "Banner added successfully",
      banner: newBanner,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "An error occurred while adding the banner",
      error: error.message,
    });
  }
};

const getAllBanners = async (req, res) => {
  try {

    const banners = await Banner.find({})
    console.log(banners, "banners");
    return res.status(200).send({
      success: true,
      message: "Banners fetched successfully",
      banners,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "An error occurred while fetching banners",
      error: error.message,
    });
  }
};

const updateBanner = async (req, res) => {
  try {
    const { bannerId, title } = req.body;
    console.log(req.body,"update");
    // Find the existing banner
    const banner = await Banner.findById(bannerId);
    if (!banner) {
      return res.status(404).json({ success: false, message: "Banner not found" });
    }

    // Handle image update if a new file is uploaded
    let imageUrl = banner.imageUrl;
    if (req.file) {
      if (imageUrl) {
        const publicId = getPublicIdFromUrl(imageUrl);
        if (publicId) {
          try {
            await cloudinary.uploader.destroy(publicId);
          } catch (err) {
            console.error("Error deleting old image from Cloudinary:", err);
          }
        }
      }
      imageUrl = req.file.path;
    }

    // Update the banner fields
    banner.title = title || banner.title;
    banner.imageUrl = imageUrl;
    await banner.save();

    res.status(200).json({ success: true, message: "Banner updated successfully", banner });
  } catch (error) {
    console.error("Error updating banner:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};


const deleteBanner = async (req, res) => {
  try {
    const { bannerId } = req.body;
    console.log(req.body);

    const banner = await Banner.findById(bannerId);
    if (!banner) {
      return res
        .status(404)
        .json({ success: false, message: "banner not found" });
    }
    if (banner.imageUrl) {
      const publicId = getPublicIdFromUrl(banner.imageUrl);
      if (publicId) {
        const result = await cloudinary.uploader.destroy(publicId);
        console.log("Cloudinary deletion result:", result);
      } else {
        console.log(
          "Could not extract publicId from image URL:",
          banner.imageUrl
        );
      }
    }
    await Banner.findByIdAndDelete(bannerId);

    res
      .status(200)
      .json({ success: true, message: "banner deleted successfully" });
  } catch (error) {
    console.error("Error in deleteProduct:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

module.exports = {
  addbanner,
  getAllBanners,
  updateBanner,
  deleteBanner,
 
};
