const Joi = require("joi");

exports.definitionsValidation = (body) => {
  const schemaDefinitions = Joi.object({
    word_id: Joi.number().integer(),
    definition_text: Joi.string().messages({
      "string.empty": "So'z bo'sh bo'lishi mumkin emas",
      "any.required": "So'zni kirit",
    }),
    part_of_speech_id: Joi.number().integer(),
    definition_order: Joi.number().integer(),
    created_at: Joi.date(),
    updated_at: Joi.date(),
    created_by: Joi.number().integer(),
  });
  return schemaDefinitions.validate(body, {
    abortEarly: false,
  });
};
