const { generateError } = require('../../utils');
const { userIdSchema } = require('../../schemas/users');
const { selectUserById, deleteUserById } = require('../../repositories/users');

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    await userIdSchema.validateAsync(id);

    const user = await selectUserById(id);

    if (!user) {
      generateError('usuario no existe', 404);
    }

    await deleteUserById(id);

    res
      .status(200)
      .send({ status: 'ok', message: 'usuario eliminado correctamente' });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteUser;
