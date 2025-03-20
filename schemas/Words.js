const { Schema, model } = require("mongoose");

const wordsScheme = new Schema(
  {
    word: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
      tolowercase: true,
    },
    letter: {
      type: String,
      index: true,
    },
    language_id: Number,
    word_text: String,
    created_at: Date,
    updated_at: Date,
    created_by: Number,
    updated_by: Number,
    is_active:Boolean
  },
  {
    versionKey: false,
  }
);

module.exports = model("Words", wordsScheme);