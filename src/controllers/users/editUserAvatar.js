const getDB = require('../../database/getPool');

const { savePhoto, deletePhoto } = require('../../utils/saveAndDeletePhoto');

const editUserAvatar = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const { idUser } = req.params;

    if (!(req.files && req.files.avatar)) {
      const error = new Error('Faltan campos');
      error.httpStatus = 400;
      throw error;
    }

    const [user] = await connection.query(
      `SELECT avatar FROM users WHERE id = ?`,
      [idUser]
    );

    if (user[0].avatar) {
      await deletePhoto(user[0].avatar);
    }

    const avatarName = await savePhoto(req.files.avatar, 0);

    await connection.query(
      `UPDATE users SET avatar = ?, modifiedAt = ? WHERE id = ?`,
      [avatarName, idUser]
    );

    res.send({
      status: 'ok',
      message: 'Usuario actualizado',
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = editUserAvatar;
