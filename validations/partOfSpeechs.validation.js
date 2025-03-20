const Joi = require("joi");

exports.partOfSpeechsValidation = (body) => {
  const schemaPartOfSpeechs = Joi.object({
    name: Joi.string().required().messages({
      "string.empty": "PartOfSpeech bo'sh bo'lishi mumkin emas",
      "any.required": "PartOfSpeechni kirit",
    }),
    abbreviation: Joi.string()
      .max(6)
      .message("username 6 ta harfdan uzun bo'lmasin")
      .required()
      .messages({
        "string.empty": "PartOfSpeech bo'sh bo'lishi mumkin emas",
        "any.required": "PartOfSpeechni kirit",
      }),
    description: Joi.string()
  });
  return schemaPartOfSpeechs.validate(body, {
    abortEarly: false,
  });
};
