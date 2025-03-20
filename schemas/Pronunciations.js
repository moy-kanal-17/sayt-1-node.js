const { Schema, model } = require("mongoose");

const pronunciationsScheme = new Schema(
  {
    word_id: {
      type: Number,
      required: true,
    },
    ipa_text: String,
    audio_file_path: String,
    created_at: Date,
    createed_by: Number,
  },
  {
    versionKey: false,
  }
);

module.exports = model("Pronunciation", pronunciationsScheme);
