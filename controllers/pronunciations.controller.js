const { errorHandler } = require("../helpers/error_handler");
const {pronunciationsValidation} = require("../validations/pronunciations.validation");
const Pronunciations = require("../schemas/Pronunciations");
const { default: mongoose } = require("mongoose");

const updatePronunciationById = async (req, res) => {
  try {
    const id = req.params.id;

    const { error, value } = pronunciationsValidation(req.body);

    if (error) {
      return errorHandler(error, res);
    }

    const { word_id, ipa_text, audio_file_path, created_at, created_by } =
      value;
    console.log(value);

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect ObjectId" });
    }

    const pronunciation = await Pronunciations.findOneAndUpdate(
      { _id: id },
      {
        word_id,
        ipa_text,
        audio_file_path,
        created_at,
        created_by,
      },
      { new: true }
    );
    res.send({ pronunciation });
  } catch (error) {
    errorHandler(error, res);
  }
};

const addNewPronunciation = async (req, res) => {
  try {
    const { error, value } = pronunciationsValidation(req.body);

    if (error) {
      return errorHandler(error, res);
    }

    const { word_id, ipa_text, audio_file_path, created_at, created_by } =
      value;
    console.log(value);

    const newPronunciation = await Pronunciations.create({
      word_id,
      ipa_text,
      audio_file_path,
      created_at,
      created_by,
    });
    console.log(newPronunciation);

    res
      .status(201)
      .send({ message: "Yangi talaffuz qo'shildi", newPronunciation });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllPronunciations = async (req, res) => {
  try {
    const pronunciations = await Pronunciations.find({});
    res.status(200).send({ message: "Pronunciations", pronunciations });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getPronunciationById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect ObjectId" });
    }
    const pronunciation = await Pronunciations.findById(id);
    res.send({ pronunciation });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Serverda xatolik" });
  }
};

const deletePronunciationById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect ObjectId" });
    }

    const pronunciation = await Pronunciations.findByIdAndDelete({ _id: id });
    res.send({ pronunciation });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewPronunciation,
  getAllPronunciations,
  getPronunciationById,
  deletePronunciationById,
  updatePronunciationById,
};
