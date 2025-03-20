const Joi = require("joi");
const { Schema, model } = require("mongoose");


exports.pronunciationsValidation = (body) => {
  const schemaPronunciations = Joi.object({
    word_id: Joi.number().integer().min(1),
    ipa_text: Joi.string().required().messages({
      "string.empty": "ipa bo'sh bo'lishi mumkin emas",
      "any.required": "ipa ni kirit",
    }),
    audio_file_path: Joi.string().required().messages({
      "string.empty": "path bo'sh bo'lishi mumkin emas",
      "any.required": "path ni kirit",
    }),
    created_at: Joi.date(),
    created_by: Joi.number().integer().min(1),
  });
  return schemaPronunciations.validate(body, {
    abortEarly: false,
  });
};
