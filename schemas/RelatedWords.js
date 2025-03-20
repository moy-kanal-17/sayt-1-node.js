const { string } = require("joi");
const { Schema, model } = require("mongoose");

const relatedWordsSchema = new Schema(
  {
    word_id: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
      tolowercase: true,
    },
    releted_to_word_id: String,
    relation_type_id: String,
    created_at: Date,
    created_by: String,
  },
  {
    versionKey: false,
  }
);

module.exports = model("RelatedWords", relatedWordsSchema);
