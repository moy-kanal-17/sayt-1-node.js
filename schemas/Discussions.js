const { Schema, model } = require("mongoose");

const discussionsScheme = new Schema(
  {
    word_id: Number,
    user_id: Number,
    discussion_text: String,
    created_at: Date,
    is_active:Boolean
  },
  {
    versionKey: false,
  }
);

module.exports = model("Discussions", discussionsScheme);
