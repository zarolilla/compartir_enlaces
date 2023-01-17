require('dotenv').config();
const getPool = require('./getPool');

const initDb = async () => {
  try {
    const pool = getPool();
    console.log('borrando tabla...');

    await pool.query('DROP TABLE IF EXISTS likes;');
    //await pool.query('DROP TABLE IF EXISTS avatar_images;'); intente crear una tabla aparte pero mejor dentro del usuario
    await pool.query('DROP TABLE IF EXISTS posts;');
    await pool.query('DROP TABLE IF EXISTS users;');

    console.log('creando tabla de usuarios');

    await pool.query(`
        CREATE TABLE users (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(100) NOT NULL,
            name VARCHAR(50) NOT NULL,
            avatar VARCHAR(100),
            registrationCode VARCHAR(100),
            role ENUM("admin", "normal") DEFAULT "normal",
            createdAt DATETIME NOT NULL,
            modifiedAt DATETIME
            );
            `);
    console.log('creando tabla de post');

    await pool.query(`
        CREATE TABLE posts (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(200)NOT NULL,
        description VARCHAR(5000) NOT NULL,
        link VARCHAR(500) NOT NULL,
        userId INT UNSIGNED NOT NULL,
        FOREIGN KEY (userId) REFERENCES users (id),
        createdAt DATETIME NOT NULL,
        modifiedAt DATETIME
        );
        `);

    console.log('creando tabla de likes');

    await pool.query(`
    CREATE TABLE likes (
      id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      userId INT UNSIGNED NOT NULL,
      postId INT UNSIGNED NOT NULL,
      FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE,
      FOREIGN KEY (postId) REFERENCES posts (id) ON DELETE CASCADE
      );
      `);

    console.log('todo nuevo desde 0');
  } catch (error) {
    console.error(error.message);
  } finally {
    process.exit();
  }
};

initDb();
