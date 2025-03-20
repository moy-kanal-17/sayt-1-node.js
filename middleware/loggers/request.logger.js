const expressWinston = require("express-winston");
const winston = require("winston");
const config = require("config");
require("winston-mongodb");

module.exports = expressWinston.logger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.MongoDB({
      db: config.get("dbUri"),
    }),
  ],
  format: winston.format.combine(winston.format.json()),
  meta: true, // optional: control whether you want to log the meta data about the request (default to true)
  msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
  expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
  ignoreRoute: function (req, res) {
    return false;
  }, // optional: allows to skip some log messages based on request and/or response
});
