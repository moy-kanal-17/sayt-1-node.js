const { errorHandler } = require("../helpers/error_handler");
const {
  discussionsValidation,
} = require("../validations/discussions.validation");
const Discussions = require("../schemas/Discussions");
const { default: mongoose } = require("mongoose");

const updateDiscussionById = async (req, res) => {
  try {
    const id = req.params.id;

    const { error, value } = discussionsValidation(req.body);

    if (error) {
      return errorHandler(error, res);
    }

    const {
      word_id,
      user_id,
      discussion_text,
      created_at,
      is_active,
    } = value;
    console.log(value);

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect ObjectId" });
    }

    const discussion = await Discussions.findOneAndUpdate(
      { _id: id },
      {
        word_id,
        user_id,
        discussion_text,
        created_at,
        is_active,
      },
      { new: true }
    );
    res.send({ discussion });
  } catch (error) {
    errorHandler(error, res);
  }
};

const addNewDiscussion = async (req, res) => {
  try {
    const { error, value } = discussionsValidation(req.body);

    if (error) {
      return errorHandler(error, res);
    }

    const { word_id, user_id, discussion_text, created_at, is_active } = value;
    console.log(value);

    const newDiscussion = await Discussions.create({
      word_id,
      user_id,
      discussion_text,
      created_at,
      is_active,
    });
    console.log(newDiscussion);
    
    res.status(201).send({ message: "Yangi baxs qo'shildi", newDiscussion });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllDiscussions = async (req, res) => {
  try {
    const discussions = await Discussions.find({});
    res.status(200).send({ message: "Saxslar", discussions });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getDiscussionById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect ObjectId" });
    }
    const discussion = await Discussions.findById(id);
    res.send({ discussion });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Serverda xatolik" });
  }
};

const deleteDiscussionById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect ObjectId" });
    }

    const discussion = await Discussions.findByIdAndDelete({ _id: id });
    res.send({ discussion });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewDiscussion,
  getAllDiscussions,
  getDiscussionById,
  deleteDiscussionById,
  updateDiscussionById,
};
