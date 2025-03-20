const { errorHandler } = require("../helpers/error_handler");
const {
  definitionsValidation,
} = require("../validations/discussions.validation");
const Definitions = require("../schemas/Definitions");
const { default: mongoose } = require("mongoose");

const updateDefinitionById = async (req, res) => {
  try {
    const id = req.params.id;

    const { error, value } = definitionsValidation(req.body);

    if (error) {
      return errorHandler(error, res);
    }

    const {
      word_id,
      definition_text,
      part_of_speech_id,
      definition_order,
      created_at,
      updated_at,
      created_by,
    } = value;
    console.log(value);

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect ObjectId" });
    }

    const definition = await Definitions.findOneAndUpdate(
      { _id: id },
      {
        word_id,
        definition_text,
        part_of_speech_id,
        definition_order,
        created_at,
        updated_at,
        created_by,
      },
      { new: true }
    );
    res.send({ definition });
  } catch (error) {
    errorHandler(error, res);
  }
};

const addNewDefinition = async (req, res) => {
  try {
    const { error, value } = definitionsValidation(req.body);

    if (error) {
      return errorHandler(error, res);
    }

    const {
      word_id,
      definition_text,
      part_of_speech_id,
      definition_order,
      created_at,
      updated_at,
      created_by,
    } = value;
    console.log(value);

    const newDefinition = await Definitions.create({
      word_id,
      definition_text,
      part_of_speech_id,
      definition_order,
      created_at,
      updated_at,
      created_by,
    });
    console.log(newDefinition);

    res.status(201).send({ message: "Yangi foydalanuvchi qo'shildi", newDefinition });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllDefinitions = async (req, res) => {
  try {
    const definitions = await Definitions.find({});
    res.status(200).send({ message: "Foydalanuvchilar", definitions });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getDefinitionById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect ObjectId" });
    }
    const definition = await Definitions.findById(id);
    res.send({ definition });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Serverda xatolik" });
  }
};

const deleteDefinitionById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect ObjectId" });
    }

    const definition = await Definitions.findByIdAndDelete({ _id: id });
    res.send({ definition });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewDefinition,
  getAllDefinitions,
  getDefinitionById,
  deleteDefinitionById,
  updateDefinitionById,
};
