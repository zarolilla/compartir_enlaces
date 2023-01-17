const getDB = require('../database/getPool');

const userExists = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const { idUser } = req.params;

    const [user] = await connection.query(
      `SELECT id FROM users WHERE id = ? AND deleted = false`,
      [idUser]
    );

    if (user.length < 1) {
      const error = new Error('El usuario no existe');
      error.httpStatus = 404;
      throw error;
    }

    next();
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = userExists;
