const { errorHandler } = require("../helpers/error_handler");
const {
  editHistoriesValidation,
} = require("../validations/editHistories.validation");
const EditHistories = require("../schemas/EditHistories");
const { default: mongoose } = require("mongoose");

const updateEditHistoryById = async (req, res) => {
  try {
    const id = req.params.id;

    const { error, value } = editHistoriesValidation(req.body);

    if (error) {
      return errorHandler(error, res);
    }

    const { word_id, user_id, edit_type, edit_details, edit_timestamp } = value;
    console.log(value);

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect ObjectId" });
    }

    const editHistory = await EditHistories.findOneAndUpdate(
      { _id: id },
      {
        word_id,
        user_id,
        edit_type,
        edit_details,
        edit_timestamp,
      },
      { new: true }
    );
    res.send({ editHistory });
  } catch (error) {
    errorHandler(error, res);
  }
};

const addNewEditHistory = async (req, res) => {
  try {
    const { error, value } = editHistoriesValidation(req.body);

    if (error) {
      return errorHandler(error, res);
    }

    const { word_id, user_id, edit_type, edit_details, edit_timestamp } = value;
    console.log(value);

    const newEditHistory = await EditHistories.create({
      word_id,
      user_id,
      edit_type,
      edit_details,
      edit_timestamp,
    });
    console.log(newEditHistory);

    res
      .status(201)
      .send({ message: "Yangi foydalanuvchi qo'shildi", newEditHistory });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllEditHistories = async (req, res) => {
  try {
    const editHistories = await EditHistories.find({});
    res.status(200).send({ message: "Foydalanuvchilar", editHistories });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getEditHistoryById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect ObjectId" });
    }
    const editHistory = await EditHistories.findById(id);
    res.send({ editHistory });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Serverda xatolik" });
  }
};

const deleteEditHistoryById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect ObjectId" });
    }

    const editHistory = await EditHistories.findByIdAndDelete({ _id: id });
    res.send({ editHistory });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewEditHistory,
  getAllEditHistories,
  getEditHistoryById,
  deleteEditHistoryById,
  updateEditHistoryById,
};
