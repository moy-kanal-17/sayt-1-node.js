const { Schema, model } = require("mongoose");

const editHistoriesScheme = new Schema(
  {
    word_id: Number,
    user_id: Number,
    edit_type: String,
    edit_details: String,
    edit_timestamp: Date,
  },
  {
    versionKey: false,
  }
);

module.exports = model("EditHistories", editHistoriesScheme);
