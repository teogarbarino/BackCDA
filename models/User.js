const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  value: {
    type: [Number],
    required: true,
  },
});

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 5,
      unique: true,
    },
    classe: {
      type: String,
      enum: {
        values: ["6", "5", "4", "3"],
        message: "La classe {VALUE} n'existe pas.",
      },
      required: true,
      unique: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: "Email address is required",
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      minlength: 6,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    scores: [scoreSchema],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
const Score = mongoose.model("Score", scoreSchema);

module.exports = { User, Score };
