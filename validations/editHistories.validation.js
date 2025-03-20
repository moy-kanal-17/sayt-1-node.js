const Joi = require("joi");

exports.editHistoriesValidation = (body) => {
  const schemaEditHistories = Joi.object({
    word_id: Joi.number().integer(),
    user_id: Joi.number().integer(),
    edit_type: Joi.string().messages({
      "string.empty": "Tarix bo'sh bo'lishi mumkin emas",
      "any.required": "Tarixni kirit",
    }),
    edit_details: Joi.string().messages({
      "string.empty": "Ma'lumot o'rni bo'sh bo'lishi mumkin emas",
      "any.required": "Ma'lumotni kirit",
    }),
    edit_timestamp: Joi.date(),
  });
  return schemaEditHistories.validate(body, {
    abortEarly: false,
  });
};
