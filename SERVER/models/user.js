import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    default:
      "https://res.cloudinary.com/djlzfhwqo/image/upload/v1679082034/samples/landscapes/beach-boat.jpg",
  },
  mobileNumber: {
    type: String,
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  designation: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
