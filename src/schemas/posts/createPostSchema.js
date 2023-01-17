const Joi = require('joi');

const createPostSchema = Joi.object({
  title: Joi.string().min(4).max(100).required().messages({
    'string.min': 'titulo tiene menos de 4 caracteres',
    'string.max': 'el titulo supera los 100 caracteres',
    'any.required': 'Tienes que poner un titulo',
    'string.base': 'Title has to be a string',
  }),
  description: Joi.string().min(10).max(5000).required().messages({
    'string.min': 'descripcion demasiado corta',
    'string.max': 'Descripcion demasiado largo',
    'any.required': ' La descripcion es obligatoria',
    'string.base': 'Descripcion tiene que ser un string',
  }),
  link: Joi.string().min(10).max(5000).required().messages({
    'string.min': 'descripcion demasiado corta',
    'string.max': 'Descripcion demasiado largo',
    'any.required': 'El link es obligatorio',
    'string.base': 'Descripcion tiene que ser un string',
  }),
});

module.exports = createPostSchema;
