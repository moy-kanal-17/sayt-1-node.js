const Joi = require("joi");
// const { Schema, model } = require("mongoose");


exports.etymologiesValidation = (body) => {
  const schemaEtymologies = Joi.object({
    word_id: Joi.number().integer().min(1),
    etymology_text: Joi.string()
      .min(1)
      .message("username 3 ta harfdan kam bo'lmasin")
      .max(100)
      .message("username 100 ta harfdan uzun bo'lmasin")
      .required()
      .messages({
        "string.empty": "So'z bo'sh bo'lishi mumkin emas",
        "any.required": "So'zni kirit",
      }),
    etymology_order: Joi.number().integer().min(1),
    created_at: Joi.date(),
    created_by: Joi.number().integer().min(1),
  });
  return schemaEtymologies.validate(body, {
    abortEarly: false,
  });
};
