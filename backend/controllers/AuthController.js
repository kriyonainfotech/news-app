const UserModel = require("../models/authModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    console.log(req.body);


    if (!name || !email || !phone || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the fields" });
    }

    const user = await UserModel.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const users = await UserModel.create({ name, email, phone, password: hashedPassword });

    return res.status(200).send({
      success: true,
      message: "User created successfully",
      users
    });


  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
      error: error.message,
    });
  }
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body, "login");

    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please fill all the fields",
      });
    }
    const user = await UserModel.findOne({ email }).select("email password");
    console.log(user);

    if (!user) {
      return res.status(400).send({
        success: false,
        message: "Invalid Email or Password",
      });
    }
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Phone or Password",
      });
    }
    //  Generate token and set cookie
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    res.cookie("refreshToken", token, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 3 * 60 * 60 * 1000, // 3 hours in milliseconds
    });
    console.log("Login successful");

    res.status(200).send({
      success: true,
      message: "login Successfully",
      token: token,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: error.message,
      error: error.message,
    });
  }
};


const logout = async (req, res) => {
  try {
    //   res.setHeader(
    //     "Set-Cookie",
    //     "refreshToken=; HttpOnly; SameSite=None; Secure; Path=/; Max-Age=0"
    //   );
    let token = req.headers.authorization
      ? req.headers.authorization.split(" ")[1] // Extract token after "Bearer"
      : req.cookies.refreshToken;
    // console.log(token,"token logOut");

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true, // Use `false` for local development without HTTPS
      sameSite: "None", // Change this to 'Lax' if SameSite=None is causing issues
    });

    console.log("Logout successful");

    return res.status(200).send({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).send({
      success: false,
      message: "An error occurred during logout",
      error: error.message,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User Fetched Succesfully.",
      user,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "An error occurred during userfetch",
      error: error.message,
    });
  }
};
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Assumes you have middleware setting req.user
    const profilePic = req.file ? req.file.path : null;

    console.log(
      req.file,
      "Uploaded File:",
      req.body,
      "Request Body:",
      profilePic
    );

    // Extract fields from the request body
    const {
      name,
      email,
      phone,
      address,
    } = req.body;

    // Prepare the fields to be updated
    const updatedFields = {};

    if (name) updatedFields.name = name;
    if (email) updatedFields.email = email;
    if (phone) updatedFields.phone = phone;
    if (address) updatedFields.address = address;
    if (profilePic) updatedFields.profilePic = profilePic;


    // Update user data in the database
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $set: updatedFields },
      { new: true, runValidators: true } // Validate fields before updating
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the profile",
      error: error.message,
    });
  }
};
const getalluser = async (req, res) => {
  try {
    const user = await UserModel.find({});

    // console.log(user);

    return res.status(200).json({
      success: true,
      message: "Users fetched successfully.",
      user,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
      error: error.message,
    });
  }
};
const deleteUser = async (req, res) => {
  try {
    const userId = req.body.id;
    console.log(userId, "deleteid");

    const user = await UserModel.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "An error occurred while updating the profile",
      error: error.message,
    });
  }
};
const UpdateUser = async (req, res) => {
  try {
    const userId = req.body.id; // Use authenticated user's ID or extract from body
    console.log(userId,"edit id");
    
    const user = await UserModel.findById(userId);
    console.log(user, "update");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID",
      });
    }

    const { name, email, phone } = req.body;

    // Validate input fields
    if (!name && !email && !phone ) {
      return res.status(400).json({
        success: false,
        message: "No fields to update provided",
      });
    }

    // Build the update object
    const updatedFields = {};
    if (name) updatedFields.name = name;
    if (email) updatedFields.email = email;
    if (phone) updatedFields.phone = phone;

    // Update user data in the database
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $set: updatedFields },
      { new: true, runValidators: true } // `new` returns updated document, `runValidators` ensures schema validation
    );

    // Handle case when user is not found
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Respond with success
    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the profile",
      error: error.message,
    });
  }
};

const checkAuth = async (req, res) => {
  let token = req.headers.authorization
    ? req.headers.authorization.split(" ")[1] // Extract token after "Bearer"
    : req.cookies.refreshToken;

  if (!token) {
    return res.status(401).json({ success: false, message: "No token found" });
  }
  // console.log(token, "token");


  res.json({ success: true, token });
};

const updateRole = async (req, res) => {
  try {
    const { email, role } = req.body;
    console.log(req.body, "role");

    // Validate role
    if (!role || !["user", "admin"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role value. Please choose 'User' or 'Admin'.",
      });
    }

    // Find the user by email and update their role
    const updatedUser = await UserModel.findOneAndUpdate(
      { email: email },
      { role: role },
      { new: true, runValidators: true }
    );

    // If user not found, return an error
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Respond with success
    return res.status(200).json({
      success: true,
      message: `User role updated to ${role}`,
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the user role",
      error: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logout,
  getalluser,
  getUser,
  updateProfile,
  deleteUser,
  UpdateUser,
  checkAuth,
  updateRole
};
