const { errorHandler } = require("../helpers/error_handler");
const { examplesValidation } = require("../validations/examples.validation");
const Examples = require("../schemas/Examples");
const { default: mongoose } = require("mongoose");

const updateExampleById = async (req, res) => {
  try {
    const id = req.params.id;

    const { error, value } = examplesValidation(req.body);

    if (error) {
      return errorHandler(error, res);
    }

    const {
      word_id,
      example_text,
      example_translation,
      created_at,
      created_by,
    } = value;
    console.log(value);

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect ObjectId" });
    }

    const example = await Examples.findOneAndUpdate(
      { _id: id },
      {
        word_id,
        example_text,
        example_translation,
        created_at,
        created_by,
      },
      { new: true }
    );
    res.send({ example });
  } catch (error) {
    errorHandler(error, res);
  }
};

const addNewExample = async (req, res) => {
  try {
    const { error, value } = examplesValidation(req.body);

    if (error) {
      return errorHandler(error, res);
    }

    const {
      word_id,
      example_text,
      example_translation,
      created_at,
      created_by,
    } = value;
    console.log(value);

    const newExample = await Examples.create({
      word_id,
      example_text,
      example_translation,
      created_at,
      created_by,
    });
    console.log(newExample);

    res.status(201).send({ message: "Yangi misol qo'shildi", newExample });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllExamples = async (req, res) => {
  try {
    const examples = await Examples.find({});
    res.status(200).send({ message: "Misollar", examples });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getExampleById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect ObjectId" });
    }
    const example = await Examples.findById(id);
    res.send({ example });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Serverda xatolik" });
  }
};

const deleteExampleById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect ObjectId" });
    }

    const example = await Examples.findByIdAndDelete({ _id: id });
    res.send({ example });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewExample,
  getAllExamples,
  getExampleById,
  deleteExampleById,
  updateExampleById,
};
