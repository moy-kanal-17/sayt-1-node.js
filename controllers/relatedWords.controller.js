const { errorHandler } = require("../helpers/error_handler");
const { relatedWordsValidation } = require("../validations/relatedWords.validation");
const RelatedWords = require("../schemas/RelatedWords");
const { default: mongoose } = require("mongoose");

const updateRelatedWordById = async (req, res) => {
  try {
    const id = req.params.id;

    const { error, value } = relatedWordsValidation(req.body);

    if (error) {
      return errorHandler(error, res);
    }

    const {
      word_id,
      related_to_word_id,
      relation_type_id,
      created_at,
      created_by,
    } = value;
    console.log(value);

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect ObjectId" });
    }

    const relatedWord = await RelatedWords.findOneAndUpdate(
      { _id: id },
      {
        word_id,
        related_to_word_id,
        relation_type_id,
        created_at,
        created_by,
      },
      { new: true }
    );
    res.send({ relatedWord });
  } catch (error) {
    errorHandler(error, res);
  }
};

const addNewRelatedWord = async (req, res) => {
  try {
    const { error, value } = relatedWordsValidation(req.body);

    if (error) {
      return errorHandler(error, res);
    }

    const {
      word_id,
      related_to_word_id,
      relation_type_id,
      created_at,
      created_by,
    } = value;
    console.log(value);

    const newRelatedWord = await RelatedWords.create({
      word_id,
      related_to_word_id,
      relation_type_id,
      created_at,
      created_by,
    });
    console.log(newRelatedWord);

    res
      .status(201)
      .send({ message: "Yangi relatedWords qo'shildi", newRelatedWord });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllRelatedWords = async (req, res) => {
  try {
    const relatedWords = await RelatedWords.find({});
    res.status(200).send({ message: "Bog'langan so'zlar", relatedWords });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getRelatedWordById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect ObjectId" });
    }
    const relatedWord = await RelatedWords.findById(id);
    res.send({ relatedWord });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteRelatedWordById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect ObjectId" });
    }

    const relatedWord = await RelatedWords.findByIdAndDelete({ _id: id });
    res.send({ relatedWord });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewRelatedWord,
  getAllRelatedWords,
  getRelatedWordById,
  deleteRelatedWordById,
  updateRelatedWordById,
};
