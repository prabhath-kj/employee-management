import User from "../models/user";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import cloudinary from "../utils/cloudinary";
import * as dotenv from "dotenv";
dotenv.config();

export default {
  homePage: async (req, res) => {
    res.send("Hello, Express with ES6!");
  },

  loginPage: async (req, res) => {
    res.send("Hello,enter email and password");
  },

  loginPost: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.send({
          success: false,
          message: "No user found",
        });
      }
      const bytes = CryptoJS.AES.decrypt(
        user?.password,
        process.env.SECRET_PASSPHRASE
      );
      const originalText = bytes.toString(CryptoJS.enc.Utf8);

      if (password === originalText) {
        const token = jwt.sign(
          { user_id: user._id },
          process.env.SECRET_PASSPHRASE,
          {
            expiresIn: "2h",
          }
        );

        return res.send({
          success: true,
          message: "user logged in successfully",
          data: token,
        });
      } else {
        return res.send({
          success: false,
          message: "Invalid Credentials",
        });
      }
    } catch (err) {
      return res.send({
        success: false,
        message: "Invalid Credentials",
      });
    }
  },

  signupPage: async (req, res) => {
    res.send("enter details");
  },
  signUP: async (req, res) => {
    try {
      const { username, email, password, mobileNumber,designation } = req.body;

      const oldUser = await User.findOne({ email: email });

      if (oldUser) {
        return res.send({
          success: false,
          message: "User Already Exist. Please Login",
        });
      }

      const newUser = new User({
        username: username,
        email: email,
        designation:designation,
        mobileNumber: mobileNumber,
        password: CryptoJS.AES.encrypt(
          password,
          process.env.SECRET_PASSPHRASE
        ).toString(),
      });
      const user = await newUser.save();
      // Create token

      const token = jwt.sign(
        { user_id: user._id },
        process.env.SECRET_PASSPHRASE,
        {
          expiresIn: "2h",
        }
      );

      res.send({
        success: true,
        message: "user logged in successfully",
        data: token,
      });
    } catch (err) {
      return res.send({
        success: false,
        message: err.message,
      });
    }
  },

  getUser: async (req, res) => {
    try {
      if (!req?.body?.user_id)
        return res.send({
          success: false,
          message: "User ID required",
        });

      const user = await User.findById(req.body.user_id).exec();

      if (!user) {
        return res.send({
          success: false,
          message: `User ID ${req.body.user_id} not found`,
        });
      }
      res.send({
        success: true,
        data: user,
      });
    } catch (err) {
      res.send({
        success: false,
        message: err.message,
      });
    }
  },
  updateProfile: async (req, res) => {
    try {
      const { username, email, password, mobileNumber } = req.body;

      User.findByIdAndUpdate(
        req.body.user_id,
        {
          username: username,
          email: email,
          mobileNumber: mobileNumber,
          password: CryptoJS.AES.encrypt(
            password,
            process.env.SECRET_PASSPHRASE
          ).toString(),
        },
        { new: true } // Returns the updated user document
      )
        .then(() => {
          // Handle the updated user document
          res.send({
            success: true,
            message: "User updated successfully",
          });
        })
        .catch((err) => {
          // Handle any errors that occurred during the update operation
          res.send({
            success: false,
            message: err.message,
          });
        });
    } catch (err) {
      res.send({
        success: false,
        message: err.message,
      });
    }
  },

  updatePic: async (req, res) => {
    console.log(req.body.user_id);
    try {
      console.log(req.file.path);
      const result = await cloudinary.uploader.upload(req.file.path);
      const image = result.secure_url;
      const user = await User.findByIdAndUpdate(
        req.body.user_id,

        {
          profilePic: image,
        },
        { new: true }
      );
      console.log(user);
      if (!user) {
        return res.send({
          success: false,
          message: "profile picture uploaded failed",
          data: user,
        });
      }
      res.send({
        success: true,
        message: "profile picture uploaded successfully",
        data: user,
      });
    } catch (err) {
      res.send({
        success: false,
        message: err.message,
      });
    }
  },
};
