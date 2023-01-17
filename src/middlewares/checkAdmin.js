const { selectUserById } = require('../repositories/users');
const { generateError } = require('../utils');

const checkAdmin = async (req, res, next) => {
  try {
    const loggedUserId = req.auth.id;

    const user = await selectUserById(loggedUserId);

    if (user.role !== 'admin') {
      generateError('no tienes permisos', 403);
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = checkAdmin;
