const { errorHandler } = require("../helpers/error_handler");
const { default: mongoose } = require("mongoose");
const Words = require("../schemas/Words");
const { wordsValidation } = require("../validations/words.validation");

const addNewWord = async (req, res) => {
  try {
    // const { word } = req.body;

    const { error, value } = wordsValidation(req.body);

    if (error) {
      return errorHandler(error, res);
    }

    const { word } = value;

    const newWord = await Words.create({
      word: word,
      letter: word[0].toUpperCase(),
      language_id: 3,
      word_text: "word",
      created_at: "2020-04-03",
      updated_at: "2020-04-03",
      created_by:2,
      updated_by:1,
      is_active:false
    });

    res.status(201).send({ message: "Yangi so'z qo'shildi", newWord });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllWords = async (req, res) => {
  try {
    const words = await Words.find({});
    res.status(200).send({ message: "So'zlar", words });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateWordById = async (req, res) => {
  try {
    const id = req.params.id;

    const { error, value } = wordsValidation(req.body);

    if (error) {
      return errorHandler(error, res);
    }

    const {
      word,
      letter,
      language_id,
      word_text,
      created_at,
      updated_at,
      created_by,
      updated_by,
      is_active,
    } = value;
    console.log(value);

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect ObjectId" });
    }

    const user = await Words.findOneAndUpdate(
      { _id: id },
      {
        word,
        letter: word[0].toUpperCase(),
        language_id,
        word_text,
        created_at,
        updated_at,
        created_by,
        updated_by,
        is_active,
      },
      { new: true }
    );
    res.send({ user });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllWordsByWord = async (req, res) => {
  try {
    const searchWords = req.query.w;
    const words = await Words.find({ word: new RegExp(searchWords, "i") });
    res.status(200).send({ message: "So'zlar", words });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getWordById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect ObjectId" });
    }
    const word = await Words.findById(id);
    res.send({ word });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Serverda xatolik" });
  }
};

const deleteWordById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect ObjectId" });
    }

    const word = await Words.findByIdAndDelete({ _id: id });
    res.send({ word });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewWord,
  getAllWords,
  deleteWordById,
  getAllWordsByWord,
  getWordById,
  updateWordById,
};
