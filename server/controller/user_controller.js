import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import Users from "../model/user_model.js";

// @desc    Get User data
// @routes  GET /api/users/me
// @access  Private
const getMeUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

// @desc    Get User
// @routes  GET /api/user
// @access  Private
const getUser = asyncHandler(async (req, res) => {
  const user = await Users.find();
  res.status(200).json(user);
});

// @desc    Register User
// @routes  POST /api/users
// @access  Private
const registerUser = asyncHandler(async (req, res) => {
  const {
    last_name,
    first_name,
    suffix,
    middle_name,
    email,
    password,
    user_role,
  } = req.body;

  if (!last_name || !first_name || !email || !password || !user_role) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  //   Check if user exists
  const userExists = await Users.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await Users.create({
    last_name,
    first_name,
    suffix,
    middle_name,
    email,
    password: hashedPassword,
    user_role,
  });
  if (user) {
    res.status(201).json({
      _id: user.id,
      last_name: user.last_name,
      first_name: user.first_name,
      suffix: user.suffix,
      middle_name: user.middle_name,
      email: user.email,
      user_role: user.user_role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invaild user data");
  }
});

// @desc    Authenticate a User
// @routes  POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //   Check for user email
  const user = await Users.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      last_name: user.last_name,
      first_name: user.first_name,
      suffix: user.suffix,
      middle_name: user.middle_name,
      email: user.email,
      token: generateToken(user._id),
      user_role: user.user_role,
    });
  } else {
    res.status(400);
    throw new Error("Invaild credentials");
  }
});

// @desc    Update User
// @routes  PUT /api/users/:id
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
  // const user = await Users.findById(req.params.id);
  // if (!user) {
  //   res.status(400);
  //   throw new Error("Product and Services are not found");
  // }
  // const updatedUsers = await Users.findByIdAndUpdate(req.params.id, req.body, {
  //   new: true,
  // });
  // res.status(200).json(updatedUsers);
  const user = await Users.findById(req.params.id);
  if (user) {
    user.last_name = req.body.last_name || user.last_name;
    user.first_name = req.body.first_name || user.first_name;
    user.suffix = req.body.suffix || user.suffix;
    user.middle_name = req.body.middle_name || user.middle_name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    user.user_role = req.body.user_role || user.user_role;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      last_name: updatedUser.last_name,
      first_name: updatedUser.first_name,
      suffix: updatedUser.suffix,
      middle_name: updatedUser.middle_name,
      email: updatedUser.email,
      user_role: updatedUser.user_role,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Delete User
// @routes  DELETE /api/users/:id
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
  const user = await Users.findById(req.params.id);
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }
  const userData = await user.remove();
  res.status(200).json({
    email: userData.email,
    name: userData.first_name,
  });
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1826d",
  });
};

export { getUser, getMeUser, registerUser, loginUser, updateUser, deleteUser };
