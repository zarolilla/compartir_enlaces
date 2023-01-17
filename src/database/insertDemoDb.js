require('dotenv').config();
const bcrypt = require('bcrypt');
const getPool = require('./getPool');
const { format } = require('date-fns');

function formatDate(date) {
  return format(date, 'yyyy-MM-dd HH:mm:ss');
}

const populateDb = async () => {
  try {
    const pool = getPool();

    console.log('insertando usuarios');

    await pool.query(`
        INSERT INTO users (email, password, name, role,createdAt) VALUES 
        ("joseantonio@email.com", "${await bcrypt.hash(
          '123456',
          10
        )}", "jose", "admin","${formatDate(new Date())}"),
        ("antoñeta@email.com", "${await bcrypt.hash(
          '123456',
          10
        )}", "antoñeta", "admin","${formatDate(new Date())}"),
        ("mariobross@email.com", "${await bcrypt.hash(
          '123456',
          10
        )}", "mario", "normal","${formatDate(new Date())}")
    `);

    console.log('insertando post');

    await pool.query(`
        INSERT INTO posts (title, description, link, userId, createdAt) VALUES 
        ("video youtube", "este video es genial para hacer croquetas","https://www.youtube.com/watch?v=wOEws-JD4uE",1,"${formatDate(
          new Date()
        )}"),
        ("emular juegos sin programa", "esta pagina puedes jugar a emuladores sin necesidad de descargar nada en el ordenador","https://emulatoronline.com/", 2,"${formatDate(
          new Date()
        )}"),
        ("crear facturas online", "en esta pagina puedes crear facturas online sin necesidad de programa,inprescindible para autonomos","https://invoicehome.com/?locale=es", 3,"${formatDate(
          new Date()
        )}")
    `);

    console.log('Insertando likes...');

    await pool.query(`
        INSERT INTO likes (postId, userId) VALUES 
        (1, 2),
        (1, 3),
        (2, 1)
    `);

    console.log('todo creado de nuevo');
  } catch (error) {
    console.error(error.message);
  } finally {
    process.exit();
  }
};

populateDb();
