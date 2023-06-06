import User from "../models/user";
import jwt from "jsonwebtoken";

export default {
  login: async (req, res) => {
    try {
      const { email } = req.body;
      var validAdmin = await User.findOne({ email: email });
      if (validAdmin.isAdmin) {
        const token = jwt.sign(
          { user_id: validAdmin._id },
          process.env.SECRET_PASSPHRASE,
          {
            expiresIn: "2h",
          }
        );
        return res.send({
          success: true,
          message: "admin logged in succesfully",
          admin: validAdmin,
          data: token,
        });
      }
      res.send({
        success: false,
        message: "Invalid Credentials",
      });
    } catch (err) {
      return res.status(400).send("Invalid Credentials");
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      if (!users) return res.status(204).json({ message: "No users found" });
      res.send({
        success: true,
        data: users,
      });
    } catch (err) {
      res.json({
        success: false,
        message: err.message,
      });
    }
  },

  deleteUser: async (req, res) => {
    try {
      console.log(req?.params?.id);
      if (!req?.params?.id)
        return res.send({
          sucess: false,
          message: "User ID required",
        });

      const user = await User.findOne({ _id: req.params.id }).exec();
      if (!user) {
        return res.send({
          success: false,
          message: `User ID ${req.params.id} not found`,
        });
      }

      await user.deleteOne({ _id: req.params.id });
      res.send({
        success: true,
        message: `updated`,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getUser: async (req, res) => {
    try {
      if (!req?.params?.id)
        return res.status(400).json({ message: "User ID required" });

      const user = await User.findOne({ _id: req.params.id }).exec();
      if (!user) {
        return res
          .status(204)
          .json({ message: `User ID ${req.params.id} not found` });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};
