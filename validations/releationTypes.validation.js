const Joi = require("joi");

exports.relationTypesValidation = (body) => {
  const schemaRelationTypes = Joi.object({
    relation_name: Joi.string().required().messages({
      "string.empty": "Relation name bo'sh bo'lishi mumkin emas",
      "any.required": "Relation name ni kirit",
    }),
    description: Joi.string(),
  });
  return schemaRelationTypes.validate(body, {
    abortEarly: false,
  });
};
