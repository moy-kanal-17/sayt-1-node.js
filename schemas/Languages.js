const { Schema, model } = require("mongoose");

const languagesScheme = new Schema(
  {
    language_name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    language_code: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      tolowercase: true,
    },
    is_active: Boolean,
  },
  {
    versionKey: false,
  }
);

module.exports = model("Languages", languagesScheme);
