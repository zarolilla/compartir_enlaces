const getPool = require('../../database/getPool');

const insertUser = async (user) => {
  const { email, encryptedPassword, name, registrationCode } = user;

  const pool = getPool();

  const [{ insertId }] = await pool.query(
    'INSERT INTO users (email, password, name, registrationCode,createdAt) VALUES (?, ?, ?, ?, ?)',
    [email, encryptedPassword, name, registrationCode, new Date()]
  );

  return insertId;
};

module.exports = insertUser;
