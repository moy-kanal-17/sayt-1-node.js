const Joi = require("joi");

exports.translationsValidation = (body) => {
  const schemaTranslations = Joi.object({
    word_id: Joi.string(),
    language_id: Joi.string(),
    translation_text: Joi.string().messages({
      "string.empty": "translation_text bo'sh bo'lishi mumkin emas",
      "any.required": "translation_textni kirit",
    }),
    created_at: Joi.date(),
    created_by: Joi.string(),
  });
  return schemaTranslations.validate(body, {
    abortEarly: false,
  });
};
