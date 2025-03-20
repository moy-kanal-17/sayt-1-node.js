const Joi = require("joi");

exports.examplesValidation = (body) => {
  const schemaExamples = Joi.object({
    word_id: Joi.string(),
    example_text: Joi.string(),
    example_translation: Joi.string().messages({
      "string.empty": "example_translation bo'sh bo'lishi mumkin emas",
      "any.required": "example_translationni kirit",
    }),
    created_at: Joi.date(),
    created_by: Joi.string(),
  });
  return schemaExamples.validate(body, {
    abortEarly: false,
  });
};
