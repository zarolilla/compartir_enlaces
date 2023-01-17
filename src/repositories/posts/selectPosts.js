const getPool = require('../../database/getPool');

const selectPosts = async (queryParams) => {
  const pool = getPool();

  let sqlQuery =
    'SELECT p.*, COUNT(l.id) likes FROM posts p LEFT JOIN likes l ON p.id = l.postId';

  let values = [];

  let clause = 'WHERE';

  for (const key in queryParams) {
    const value = queryParams[key];

    sqlQuery += ` ${clause} ${key} LIKE ?`;

    values.push(`%${value}%`);

    clause = 'AND';
  }

  sqlQuery += ' GROUP BY p.id;';

  const [posts] = await pool.query(sqlQuery, values);

  return posts;
};

module.exports = selectPosts;
