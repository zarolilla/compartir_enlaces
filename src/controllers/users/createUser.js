const bcrypt = require('bcrypt');
const uuid = require('uuid');
const { selectUserByEmail, insertUser } = require('../../repositories/users');
const { createUserSchema } = require('../../schemas/users');
const { generateError, sendMail } = require('../../utils');

const createUser = async (req, res, next) => {
  try {
    await createUserSchema.validateAsync(req.body);

    const { email, password, name } = req.body;

    const userWithSameEmail = await selectUserByEmail(email);

    if (userWithSameEmail) {
      generateError('ya existe un usuario con este email!!', 400);
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const registrationCode = uuid.v4();

    const insertId = await insertUser({
      email,
      encryptedPassword,
      name,
      registrationCode,
    });

    await sendMail(
      '¡bienvenido a Compartelink!',
      `<p>Gracias por registrate! :D</p>
       <a href="http://localhost:3000/activate/${registrationCode}">activa tu cuenta</a>`,
      email
    );

    res.status(201).send({ status: 'ok', data: { id: insertId, email, name } });
  } catch (error) {
    next(error);
  }
};

module.exports = createUser;
