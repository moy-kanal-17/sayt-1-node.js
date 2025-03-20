const { Schema, model } = require("mongoose");

const categoriesScheme = new Schema(
  {
    category_name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    category_description: {
      type: String,
    },
    parent_category_id: { type: Number, required: true },
    is_active: Boolean,
  },
  {
    versionKey: false,
  }
);

module.exports = model("Categories", categoriesScheme);
