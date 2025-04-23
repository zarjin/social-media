import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: String,
    coverPicture: String,
    followers: { type: Array, default: [] },
    following: { type: Array, default: [] },
    about: String,
    lives: String,
    worksAt: String,
    country: String,
    relationship: String,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
