const { Schema, model } = require("mongoose");

const wordCategoriesScheme = new Schema(
  {
    word_id: {
      type: String,
      required: true,
    },
    category_id: String,
    created_at: Date,
    createed_by: String,
  },
  {
    versionKey: false,
  }
);

module.exports = model("WordCategories", wordCategoriesScheme);
