const Joi = require("joi");

exports.wordsValidation = (body) => {
  const schemaWord = Joi.object({
    word: Joi.string()
      .min(1)
      .message("So'z bitta harfdan kam bo'lmasligi kerak")
      .max(100)
      .message("So'z 100 ta harfdan uzun bo'lmasligi kerak")
      .required()
      .messages({
        "string.empty": "So'z bo'sh bo'lishi mumkin emas",
        "any.required": "So'zni kirit",
      }),
    letter: Joi.string(),
    language_id: Joi.number(),
    word_text: Joi.string(),
    created_at: Joi.date(),
    updated_at: Joi.date(),
    created_by: Joi.number(),
    updated_by: Joi.number(),
    is_active: Joi.boolean().default(false),
  });
  return schemaWord.validate(body);
};
