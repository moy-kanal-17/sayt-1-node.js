const { errorHandler } = require("../helpers/error_handler");
const { partOfSpeechsValidation } = require("../validations/partOfSpeechs.validation");
const PartOfSpeechs = require("../schemas/PartOfSpeechs");
const { default: mongoose } = require("mongoose");

const updatePartOfSpeechById = async (req, res) => {
  try {
    const id = req.params.id;

    const { error, value } = partOfSpeechsValidation(req.body);

    if (error) {
      return errorHandler(error, res);
    }

    const {name, abbreviation, description } = value;
    console.log(value);

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect ObjectId" });
    }

    const partOfSpeech = await PartOfSpeechs.findOneAndUpdate(
      { _id: id },
      {
        name,
        abbreviation,
        description,
      },
      { new: true }
    );
    res.send({ partOfSpeech });
  } catch (error) {
    errorHandler(error, res);
  }
};

const addNewPartOfSpeech = async (req, res) => {
  try {

    const { error, value } = partOfSpeechsValidation(req.body);

    if (error) {
      return errorHandler(error, res);
    }

    const { name, abbreviation, description } = value;
    console.log(value);
    const newPartOfSpeech = await PartOfSpeechs.create({
      name,
      abbreviation,
      description,
    });
    console.log(newPartOfSpeech);

    res.status(201).send({ message: "Yangi nutq qo'shildi", newPartOfSpeech });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllPartOfSpeechs = async (req, res) => {
  try {
    const partOfSpeechs = await PartOfSpeechs.find({});
    res.status(200).send({ message: "Zabonlar", partOfSpeechs });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getPartOfSpeechById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect ObjectId" });
    }
    const partOfSpeech = await PartOfSpeechs.findById(id);
    res.send({ partOfSpeech });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Serverda xatolik" });
  }
};

const deletePartOfSpeechById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect ObjectId" });
    }

    const partOfSpeech = await PartOfSpeechs.findByIdAndDelete({ _id: id });
    res.send({ partOfSpeech });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewPartOfSpeech,
  getAllPartOfSpeechs,
  getPartOfSpeechById,
  deletePartOfSpeechById,
  updatePartOfSpeechById,
};
