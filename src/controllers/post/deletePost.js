const { selectPostById, deletePostById } = require('../../repositories/posts');
const { postIdSchema } = require('../../schemas/posts');
const { generateError } = require('../../utils');

const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    await postIdSchema.validateAsync(id);

    const post = await selectPostById(id);

    if (!post) {
      generateError('El post no existe', 404);
    }

    const loggedUserId = req.auth.id;

    if (post.userId !== loggedUserId) {
      generateError('no tienes permisos para borrar este post', 401);
    }

    await deletePostById(id);

    res
      .status(200)
      .send({ status: 'ok', message: 'Post borrado correctamente' });
  } catch (error) {
    next(error);
  }
};

module.exports = deletePost;
