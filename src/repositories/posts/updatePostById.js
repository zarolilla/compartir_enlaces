const getPool = require('../../database/getPool');

const updatePostById = async (post) => {
  const { id, title, description, link } = post;

  const pool = getPool();

  await pool.query(
    'UPDATE posts SET title = ?, description = ? , link = ? WHERE id = ?',
    [title, description, link, id]
  );
};

module.exports = updatePostById;
