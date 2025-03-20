const Joi = require("joi");

exports.discussionsValidation = (body) => {
  const schemaDiscussions = Joi.object({
    word_id: Joi.number().integer(),
    user_id: Joi.number().integer(),
    discussion_text: Joi.string().messages({
      "string.empty": "So'z bo'sh bo'lishi mumkin emas",
      "any.required": "So'zni kirit",
    }),
    created_at: Joi.date(),
    is_active:Joi.boolean().default(false)
  });
  return schemaDiscussions.validate(body, {
    abortEarly: false,
  });
};
