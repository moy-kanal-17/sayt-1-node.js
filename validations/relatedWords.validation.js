const Joi = require("joi");
const { Schema, model } = require("mongoose");

exports.relatedWordsValidation = (body) => {
  const schemaRelatedWords = Joi.object({
    word_id: Joi.string().required().messages({
      "string.empty": "word_id bo'sh bo'lishi mumkin emas",
      "any.required": "word_idni kirit",
    }),
    related_to_word_id: Joi.string(),
    relation_type_id: Joi.string(),
    created_at:Joi.date(),
    created_by: Joi.string(),
  });
  return schemaRelatedWords.validate(body, {
    abortEarly: false,
  });
};
