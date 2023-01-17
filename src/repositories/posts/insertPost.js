const getPool = require('../../database/getPool');
const { format } = require('date-fns');

function formatDate(date) {
  return format(date, 'yyyy-MM-dd HH:mm:ss');
}

const insertPost = async (post) => {
  const { title, description, link, userId } = post;

  const pool = getPool();

  const [{ insertId }] = await pool.query(
    'INSERT INTO posts (title, description, link, userId,createdAt) VALUES (?, ?, ?, ?, ?)',
    [title, description, link, userId, new Date()]
  );

  return insertId;
};

module.exports = insertPost;
