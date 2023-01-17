const Joi = require('joi');

const loginUserSchema = Joi.object({
  email: Joi.string().email().min(5).max(100).required().messages({
    'string.min': 'Correo demasiado corto',
    'string.max': 'correo demsiado largo',
    'any.required': 'correo es obligatorio',
    'string.email': 'correo no es un correo valido',
  }),
  password: Joi.string().min(6).max(100).required().messages({
    'string.min': 'tiene que tener minimo 6 caracteres',
    'string.max': 'maximo 100 caracteres',
    'any.required': 'contraseña es obligatoria',
  }),
});

module.exports = loginUserSchema;
