const Joi = require("joi");

exports.categoriesValidation = (body) => {
  const schemaCategories = Joi.object({
    category_name: Joi.string().required().messages({
      "string.empty": "Category bo'sh bo'lishi mumkin emas",
      "any.required": "Category ni kirit",
    }),
    category_description: Joi.string(),
    parent_category_id: Joi.number(),
    is_active: Joi.boolean().default(false),
  });
  return schemaCategories.validate(body, {
    abortEarly: false,
  });
};
