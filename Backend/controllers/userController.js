import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import mongoose from "mongoose";
import subscriptionModel from "../models/subscriptionModel.js";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
//route for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User doesn't exists" });
    }
    const passMatch = await bcrypt.compare(password, user.password);
    if (passMatch) {
      const token = createToken(user._id);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Incorrect password" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//route for user registration
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    //hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//route for admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "The user isn't authorized" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// add subscribers to mailing list
const subscription = async (req, res) => {
  try {
    const { email } = req.body;
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }
    const subscriber = new subscriptionModel({
      email,
    });
    const exists = await subscriptionModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "Subscriber already exists" });
    }
    await subscriber.save();
    res.json({ success: true, message: "You are added to the mailing list" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// add to cart
const addToCart = async (req, res) => {
  try {
    const { cartItems } = req.body;
    const { token } = req.headers;
    const userId = jwt.verify(token, process.env.JWT_SECRET);
    console.log(userId);

    await userModel.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(userId.id) },
      { $set: { cartData: cartItems } },
      { new: true }
    );
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//update promocodes
const updatePromo = async (req, res) => {
  try {
    const { promo } = req.body;
    const { token } = req.headers;
    const userId = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(userId.id);
    user.usedPromo.push(promo);
    await user.save();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//fetch usedPromo
const usedPromo = async (req, res) => {
  try {
    const { token } = req.headers;
    const userId = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(userId.id);
    const usedPromo = user.usedPromo;
    res.json({ success: true, usedPromo });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  loginUser,
  registerUser,
  adminLogin,
  subscription,
  addToCart,
  updatePromo,
  usedPromo,
};
