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
    // const imageUrl = req.file.path;
    const imageUrl = req.body.imageUrl;

    const { bannerName } = req.boy

    // Check for an existing banner for the user
    console.log(imageUrl, "image bannrer");
    // Create and save a new Banner instance
    const newBanner = new Banner({bannerName, imageUrl });
    await newBanner.save();

    return res.status(201).send({
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
    const { bannerId } = req.body;
    const banner = await Banner.findById(bannerId);
    if (!banner) {
      return res
        .status(404)
        .json({ success: false, message: "banner not found" });
    }
    let imageUrl = banner.imageUrl;
    if (req.file) {
      if (imageUrl) {
        const publicId = getPublicIdFromUrl(imageUrl);
        if (publicId) {
          const result = await cloudinary.uploader.destroy(publicId);
        } else {
          console.log("Could not extract publicId from URL:", imageUrl);
        }
      }
      imageUrl = req.file.path;
    }
    banner.imageUrl = imageUrl;
    await banner.save();
    res
      .status(200)
      .json({ success: true, message: "banner updated successfully", banner });
  } catch (error) {
    console.error("Error in bannerupdate:", error);
    res.status(500).json({ success: false, message: "Server error", error });
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
