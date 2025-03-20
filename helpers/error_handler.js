const logger = require("../services/logger.service");

const errorHandler = (error, res) => {
  logger.error(error)
  console.log(error);
  res.status(400).send({ error: error.message });
};

module.exports = { errorHandler };
