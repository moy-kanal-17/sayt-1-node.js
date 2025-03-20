const { Schema, model } = require("mongoose");

const examplesScheme = new Schema(
  {
    word_id: String,
    example_text: String,
    example_translation: String,
    created_at: Date,
    created_by: String,
  },
  {
    versionKey: false,
  }
);

module.exports = model("Examples", examplesScheme);
