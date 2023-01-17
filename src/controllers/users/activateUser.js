const {
  selectUserByRegistrationCode,
  deleteRegistrationCode,
} = require('../../repositories/users');
const { generateError } = require('../../utils');

const activateUser = async (req, res, next) => {
  try {
    const { registrationCode } = req.params;

    const user = await selectUserByRegistrationCode(registrationCode);

    if (!user) {
      generateError('codigo invalido o usuario ya registrado!!', 400);
    }

    await deleteRegistrationCode(registrationCode);

    res
      .status(200)
      .send({ status: 'ok', message: 'usuario activado correctamente!!' });
  } catch (error) {
    next(error);
  }
};

module.exports = activateUser;
