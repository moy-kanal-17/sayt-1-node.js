const Joi = require("joi");
const { Schema, model } = require("mongoose");

exports.languagesValidation = (body) => {
  const schemaLanguages = Joi.object({
    language_name: Joi.string()
      .min(2)
      .message("languagename 2 ta harfdan kam bo'lmasin")
      .max(20)
      .message("languagename 20 ta harfdan uzun bo'lmasin")
      .required()
      .messages({
        "string.empty": "So'z bo'sh bo'lishi mumkin emas",
        "any.required": "So'zni kirit",
      }),
    language_code: Joi.string()
      .min(2)
      .message("languagecode 2 ta harfdan kam bo'lmasin")
      .max(20)
      .message("languagecode 20 ta harfdan uzun bo'lmasin")
      .required()
      .messages({
        "string.empty": "Til bo'sh bo'lishi mumkin emas",
        "any.required": "Tilni kirit",
      }).lowercase(),
    is_active: Joi.boolean().default(false),
      });
  return schemaLanguages.validate(body, {
    abortEarly: false,
  });
};
