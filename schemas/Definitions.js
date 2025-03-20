const { Schema, model } = require("mongoose");

const definitionsScheme = new Schema(
  {
    word_id: Number,
    definition_text: String,
    part_of_speech_id: Number,
    definition_order:Number,
    created_at:Date,
    updated_at:Date,
    created_by:Number,
  },
  {
    versionKey: false,
  }
);

module.exports = model("Definitions", definitionsScheme);
