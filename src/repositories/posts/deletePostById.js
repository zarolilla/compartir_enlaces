const getPool = require('../../database/getPool');

const deletePostById = async (id) => {
  const pool = getPool();

  await pool.query('DELETE FROM posts WHERE id = ?', [id]);
};

module.exports = deletePostById;
