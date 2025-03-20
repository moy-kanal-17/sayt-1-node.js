const { Schema, model } = require("mongoose");

const etymologiesScheme = new Schema(
  {
    word_id: {
      type: Number,
      required: true,
    },
    etymology_text: String,
    etymology_order: Number,
    created_at: Date,
    createed_by: Number,
  },
  {
    versionKey: false,
  }
);

module.exports = model("Etymology", etymologiesScheme);
