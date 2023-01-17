const getDB = require('../database/getPool');

const canEditUser = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const { idUser } = req.params;

    const idReqUser = req.userAuth.id;

    if (Number(idUser) !== idReqUser) {
      const error = new Error('No tienes permisos para editar este usuario');
      error.httpStatus = 403;
      throw error;
    }

    next();
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = canEditUser;
