const { errorHandler } = require("../helpers/error_handler");
const Categories = require("../schemas/Categories");
const { default: mongoose } = require("mongoose");
const { categoriesValidation } = require("../validations/categories.validation");


const updateCategoryById = async (req, res) => {
  try {
    const id = req.params.id;

    const { error, value } = categoriesValidation(req.body);

    if (error) {
      return errorHandler(error, res);
    }

    const {
      category_name,
      category_description,
      parent_category_id,
      is_active
    } = value;
    console.log(value);

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect ObjectId" });
    }

    const category = await Categories.findOneAndUpdate(
      { _id: id },
      {
        category_name,
        category_description,
        parent_category_id,
        is_active
      },
      { new: true }
    );
    res.send({ category });
  } catch (error) {
    errorHandler(error, res);
  }
};

const addNewCategory = async (req, res) => {
  try {
    const { error, value } = categoriesValidation(req.body);

    if (error) {
      return errorHandler(error, res);
    }

    const {
      category_name,
      category_description,
      parent_category_id,
      is_active
    } = value;
    console.log(value);
        
    const newCategory = await Categories.create({
      category_name,
      category_description,
      parent_category_id,
      is_active
    });
    console.log(newCategory);

    res.status(201).send({ message: "Yangi category qo'shildi", newCategory });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Categories.find({});
    res.status(200).send({ message: "Categories", categories });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getCategoryById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect ObjectId" });
    }
    const category = await Categories.findById(id);
    res.send({ category });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Serverda xatolik" });
  }
};

const deleteCategoryById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect ObjectId" });
    }

    const category = await Categories.findByIdAndDelete({ _id: id });
    res.send({ category });
  } catch (error) {
    errorHandler(error, res);
  }
};


module.exports = {
  addNewCategory,
  getAllCategories,
  getCategoryById,
  deleteCategoryById,
  updateCategoryById,
};
