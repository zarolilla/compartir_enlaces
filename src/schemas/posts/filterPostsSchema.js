const Joi = require('joi');

const filterPostsSchema = Joi.object({
  title: Joi.string().max(200).messages({
    'string.max': 'Title has to be less than 200 characters long',
    'string.base': 'Title has to be a string',
  }),
  description: Joi.string().max(5000).messages({
    'string.max': 'Description has to be less than 5000 characters long',
    'string.base': 'Description has to be a string',
  }),
  link: Joi.string().max(500).message({
    'string.max': 'El Link es demasiado larga',
    'string.base': 'el link tiene que ser un string',
  }),
});

module.exports = filterPostsSchema;
