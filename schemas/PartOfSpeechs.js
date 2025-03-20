const { Schema, model } = require("mongoose");

const partOfSpeechsScheme = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    abbreviation: String,
    description: String,
  },
  {
    versionKey: false,
  }
);

module.exports = model("PartOfSpeechs", partOfSpeechsScheme);
