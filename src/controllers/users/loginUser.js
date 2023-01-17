const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { selectUserByEmail } = require('../../repositories/users');
const { loginUserSchema } = require('../../schemas/users');
const { generateError } = require('../../utils');

const loginUser = async (req, res, next) => {
  try {
    await loginUserSchema.validateAsync(req.body);

    const { email, password } = req.body;

    const user = await selectUserByEmail(email);

    if (!user) {
      generateError('Email o contraseña incorrecto', 400);
    }

    if (user.registrationCode) {
      generateError('usuario no activado,revisa tu email', 400);
    }

    const isPasswordOk = await bcrypt.compare(password, user.password);

    if (!isPasswordOk) {
      generateError('email o contraseña incorrecto', 400);
    }

    const tokenPayload = { id: user.id };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(200).send({ status: 'ok', data: { token } });
  } catch (error) {
    next(error);
  }
};

module.exports = loginUser;
