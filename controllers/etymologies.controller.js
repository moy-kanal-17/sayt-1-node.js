const { errorHandler } = require("../helpers/error_handler");
const {etymologiesValidation} = require("../validations/etymologies.validation");
const Etymologies = require("../schemas/Etymologies");
const { default: mongoose } = require("mongoose");

const updateEtymologyById = async (req, res) => {
  try {
    const id = req.params.id;

    const { error, value } = etymologiesValidation(req.body);

    if (error) {
      return errorHandler(error, res);
    }

    const { word_id, etymology_text, etymology_order, created_at, created_by } =
      value;
    console.log(value);

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect ObjectId" });
    }

    const etymology = await Etymologies.findOneAndUpdate(
      { _id: id },
      {
        word_id,
        etymology_text,
        etymology_order,
        created_at,
        created_by,
      },
      { new: true }
    );
    res.send({ etymology });
  } catch (error) {
    errorHandler(error, res);
  }
};

const addNewEtymology = async (req, res) => {
  try {
    const { error, value } = etymologiesValidation(req.body);

    if (error) {
      return errorHandler(error, res);
    }

    const { word_id, etymology_text, etymology_order, created_at, created_by } =
      value;
    console.log(value);

    const newEtymology = await Etymologies.create({
      word_id,
      etymology_text,
      etymology_order,
      created_at,
      created_by,
    });
    console.log(newEtymology);

    res
      .status(201)
      .send({ message: "Yangi origin qo'shildi", newEtymology });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllEtymologies = async (req, res) => {
  try {
    const etymologies = await Etymologies.find({});
    res.status(200).send({ message: "Etymologies", etymologies });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getEtymologyById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect ObjectId" });
    }
    const etymology = await Etymologies.findById(id);
    res.send({ etymology });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Serverda xatolik" });
  }
};

const deleteEtymologyById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect ObjectId" });
    }

    const etymology = await Etymologies.findByIdAndDelete({ _id: id });
    res.send({ etymology });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewEtymology,
  getAllEtymologies,
  getEtymologyById,
  deleteEtymologyById,
  updateEtymologyById,
};
