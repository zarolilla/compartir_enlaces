const getPool = require('../../database/getPool');

const selectPostById = async (id) => {
  const pool = getPool();

  // Selecciona la información de un post y la cuenta de likes que tiene
  const [[post]] = await pool.query(
    'SELECT p.*, COUNT(l.id) likes FROM posts p LEFT JOIN likes l ON p.id = l.postId WHERE p.id = ?;',
    [id]
  );

  return post;
};

module.exports = selectPostById;
