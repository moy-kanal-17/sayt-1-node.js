const { errorHandler } = require("../helpers/error_handler");
const RelationTypes = require("../schemas/RelationTypes");
const { default: mongoose } = require("mongoose");
const { relationTypesValidation } = require("../validations/releationTypes.validation");

const updateRelationTypeById = async (req, res) => {
  try {
    const id = req.params.id;

    const { error, value } = relationTypesValidation(req.body);

    if (error) {
      return errorHandler(error, res);
    }

    const {relation_name, description } = value;
    console.log(value);

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect ObjectId" });
    }

    const relationType = await RelationTypes.findOneAndUpdate(
      { _id: id },
      {
        relation_name,
        description,
      },
      { new: true }
    );
    res.send({ relationType });
  } catch (error) {
    errorHandler(error, res);
  }
};

const addNewRelationType = async (req, res) => {
  try {

    const { error, value } = relationTypesValidation(req.body);

    if (error) {
      return errorHandler(error, res);
    }

    const { relation_name, description } = value;
    console.log(value);
    const newRelationType = await RelationTypes.create({
      relation_name,
      description,
    });
    console.log(newRelationType);

    res
      .status(201)
      .send({ message: "Yangi munosabat qo'shildi", newRelationType });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllRelationTypes = async (req, res) => {
  try {
    const relationTypes = await RelationTypes.find({});
    res.status(200).send({ message: "Munosabatlar", relationTypes });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getRelationTypeById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect ObjectId" });
    }
    const relationType = await RelationTypes.findById(id);
    res.send({ relationType });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Serverda xatolik" });
  }
};

const deleteRelationTypeById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect ObjectId" });
    }

    const relationType = await RelationTypes.findByIdAndDelete({ _id: id });
    res.send({ relationType });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewRelationType,
  getAllRelationTypes,
  getRelationTypeById,
  deleteRelationTypeById,
  updateRelationTypeById,
};
