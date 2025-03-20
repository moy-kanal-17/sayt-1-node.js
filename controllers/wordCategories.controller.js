const { errorHandler } = require("../helpers/error_handler");
const {
  wordCategoriesValidation,
} = require("../validations/wordCategories.validation");
const WordCategories = require("../schemas/WordCategories");
const { default: mongoose } = require("mongoose");

const updateWordCategoryById = async (req, res) => {
  try {
    const id = req.params.id;

    const { error, value } = wordCategoriesValidation(req.body);

    if (error) {
      return errorHandler(error, res);
    }

    const { word_id, category_id, created_at, created_by } = value;
    console.log(value);

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect ObjectId" });
    }

    const wordCategory = await WordCategories.findOneAndUpdate(
      { _id: id },
      {
        word_id,
        category_id,
        created_at,
        created_by,
      },
      { new: true }
    );
    res.send({ wordCategory });
  } catch (error) {
    errorHandler(error, res);
  }
};

const addNewWordCategory = async (req, res) => {
  try {
    const { error, value } = wordCategoriesValidation(req.body);

    if (error) {
      return errorHandler(error, res);
    }

    const { word_id, category_id, created_at, created_by } = value;
    console.log(value);

    const newWordCategory = await WordCategories.create({
      word_id,
      category_id,
      created_at,
      created_by,
    });
    console.log(newWordCategory);

    res
      .status(201)
      .send({ message: "Yangi so'z turi qo'shildi", newWordCategory });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllWordCategories = async (req, res) => {
  try {
    const wordCategories = await WordCategories.find({});
    res.status(200).send({ message: "WordCategories", wordCategories });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getWordCategoryById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect ObjectId" });
    }
    const wordCategory = await WordCategories.findById(id);
    res.send({ wordCategory });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Serverda xatolik" });
  }
};

const deleteWordCategoryById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect ObjectId" });
    }

    const wordCategory = await WordCategories.findByIdAndDelete({ _id: id });
    res.send({ wordCategory });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewWordCategory,
  getAllWordCategories,
  getWordCategoryById,
  deleteWordCategoryById,
  updateWordCategoryById,
};
