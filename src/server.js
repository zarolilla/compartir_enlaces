require('dotenv').config();
const cors = require('cors');
const express = require('express');
const fileUpload = require('express-fileupload');

const {
  getPosts,
  createPost,
  deletePost,
  editPost,
  getPost,
} = require('./controllers/post');

const {
  createUser,
  loginUser,
  activateUser,
  deleteUser,
  editUserAvatar,
} = require('./controllers/users');

const { togglePostLike } = require('./controllers/likes');

const {
  handleError,
  handleNotFound,
  validateAuth,
  checkAdmin,
  userExists,
  canEditUser,
} = require('./middlewares');

const app = express();

const { PORT } = process.env;

app.use(
  cors({
    origin: ['http://127.0.0.1:5500'],
  })
);

app.use(express.json());
app.use(fileUpload());

app.get('/posts', getPosts);
app.get('/posts/:id', getPost);
app.post('/posts', validateAuth, createPost);
app.delete('/posts/:id', validateAuth, deletePost);
app.put('/posts/:id', validateAuth, editPost);
app.post('/posts/:id/like', validateAuth, togglePostLike);

app.post('/users', createUser);
app.post('/login', loginUser);
app.get('/activate/:registrationCode', activateUser);
app.put(
  '/users/:idUser/avatar',
  validateAuth,
  userExists,
  canEditUser,
  editUserAvatar
);

app.delete('/users/:id', validateAuth, checkAdmin, deleteUser);

app.use(handleNotFound);

app.use(handleError);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
