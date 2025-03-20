const { Schema, model } = require("mongoose");

const translationsScheme = new Schema(
  {
    word_id: String,
    language_id: String,
    translation_text: String,
    created_at: Date,
    created_by: String,
  },
  {
    versionKey: false,
  }
);

module.exports = model("Translations", translationsScheme);
