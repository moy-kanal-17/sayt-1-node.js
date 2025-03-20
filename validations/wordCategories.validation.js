const Joi = require("joi");
// const { Schema, model } = require("mongoose");


exports.wordCategoriesValidation = (body) => {
  const schemaWordCategories = Joi.object({
    word_id: Joi.string(),
    category_id: Joi.string().required().messages({
      "string.empty": "category_id bo'sh bo'lishi mumkin emas",
      "any.required": "category_idni kirit",
    }),
    created_at: Joi.date(),
    created_by: Joi.string(),
  });
  return schemaWordCategories.validate(body, {
    abortEarly: false,
  });
};
