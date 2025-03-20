const { Schema, model } = require("mongoose");

const relationTypesScheme = new Schema(
  {
    relation_name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: String,
  },
  {
    versionKey: false,
  }
);

module.exports = model("RelationTypes", relationTypesScheme);
