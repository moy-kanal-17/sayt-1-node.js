const { errorHandler } = require("../helpers/error_handler");
const {
  translationsValidation,
} = require("../validations/translations.validation");
const Translations = require("../schemas/Translations");
const { default: mongoose } = require("mongoose");

const updateTranslationById = async (req, res) => {
  try {
    const id = req.params.id;

    const { error, value } = translationsValidation(req.body);

    if (error) {
      return errorHandler(error, res);
    }

    const {
      word_id,
      language_id,
      translation_text,
      created_at,
      created_by,
    } = value;
    console.log(value);

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect ObjectId" });
    }

    const translation = await Translations.findOneAndUpdate(
      { _id: id },
      {
        word_id,
        language_id,
        translation_text,
        created_at,
        created_by,
      },
      { new: true }
    );
    res.send({ translation });
  } catch (error) {
    errorHandler(error, res);
  }
};

const addNewTranslation = async (req, res) => {
  try {
    const { error, value } = translationsValidation(req.body);

    if (error) {
      return errorHandler(error, res);
    }

    const { word_id, language_id, translation_text, created_at, created_by } =
      value;
    console.log(value);

    const newTranslation = await Translations.create({
      word_id,
      language_id,
      translation_text,
      created_at,
      created_by,
    });
    console.log(newTranslation);

    res.status(201).send({ message: "Yangi tarjima qo'shildi", newTranslation });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllTranslations = async (req, res) => {
  try {
    const translations = await Translations.find({});
    res.status(200).send({ message: "Tarjimalar", translations });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getTranslationById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect ObjectId" });
    }
    const translation = await Translations.findById(id);
    res.send({ translation });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Serverda xatolik" });
  }
};

const deleteTranslationById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect ObjectId" });
    }

    const translation = await Translations.findByIdAndDelete({ _id: id });
    res.send({ translation });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewTranslation,
  getAllTranslations,
  getTranslationById,
  deleteTranslationById,
  updateTranslationById,
};
