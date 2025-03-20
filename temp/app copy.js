const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const mainRouter = require("../routes/index.routes");
const cookieParser = require("cookie-parser");
const errorHandling = require("../middleware/errors/error.handling");

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});
const PORT = config.get("port") || 3030;

// console.log(process.env.NODE_ENV);
// console.log(process.env.secret);
// console.log(config.get("secret"));

//EventEmitter on
// process.on("uncaughtException", (exception) => {
//   console.log("uncaughtException", exception.message);
// });

// process.on("unhandledRejection", (rejection) => {
//   console.log("unhandledRejection", rejection);
// });
const logger = require("../services/logger.service");
const errorLogger = require("../middleware/loggers/error.logger");
const requestLogger = require("../middleware/loggers/request.logger");

logger.log("info", "Log ma'lumotlari");
logger.error("ERROR ma'lumotlari");
logger.debug("DEBUD ma'lumotlari");
logger.warn("WARN ma'lumotlari");
logger.info("INFO ma'lumotlari");
// console.trace("TRACE ma'lumotlari");
// console.table([
//   ["ali", 22],
//   ["vali", 23],
//   ["mali", 24],
// ]);

const app = express();
app.use(cookieParser());
app.use(express.json()); // parse body


app.use(requestLogger)

app.use("/api", mainRouter);

app.use(errorLogger)

app.use(errorHandling); // doim eng oxiriga yozaman

async function start() {
  try {
    await mongoose.connect(config.get("dbUri"));
    app.listen(PORT, () => {
      console.log(`Serveri is started at http://localhost${PORT}`);
    });
  } catch (error) {
    console.log(error);
    console.log("Ma'lumotlar bazasig ulanishda xatolik");
  }
}

start();
