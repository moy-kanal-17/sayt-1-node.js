const { errorHandler } = require("../helpers/error_handler");
const { languagesValidation } = require("../validations/languages.validation");
const Languages = require("../schemas/Languages");
const { default: mongoose } = require("mongoose");

const updateLanguageById = async (req, res) => {
  try {
    const id = req.params.id;

    const { error, value } = languagesValidation(req.body);

    if (error) {
      return errorHandler(error, res);
    }

    const { language_name, language_code, is_active } = value;
    console.log(value);

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect ObjectId" });
    }

    const language = await Languages.findOneAndUpdate(
      { _id: id },
      {
        language_name,
        language_code,
        is_active,
      },
      { new: true }
    );
    res.send({ language });
  } catch (error) {
    errorHandler(error, res);
  }
};

const addNewLanguage = async (req, res) => {
  try {
    const { error, value } = languagesValidation(req.body);

    if (error) {
      return errorHandler(error, res);
    }

    const { language_name, language_code, is_active } = value;
    console.log(value);

    const newLanguage = await Languages.create({
      language_name,
      language_code,
      is_active,
    });
    console.log(newLanguage);

    res.status(201).send({ message: "Yangi Til qo'shildi", newLanguage });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllLanguages = async (req, res) => {
  try {
    const languages = await Languages.find({});
    res.status(200).send({ message: "Tillar", languages });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getLanguageById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect ObjectId" });
    }
    const language = await Languages.findById(id);
    res.send({ language });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteLanguageById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect ObjectId" });
    }

    const language = await Languages.findByIdAndDelete({ _id: id });
    res.send({ language });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewLanguage,
  getAllLanguages,
  getLanguageById,
  deleteLanguageById,
  updateLanguageById,
};
