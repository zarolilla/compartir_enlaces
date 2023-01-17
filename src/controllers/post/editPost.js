const { selectPostById, updatePostById } = require('../../repositories/posts');
const { editPostSchema, postIdSchema } = require('../../schemas/posts');
const { generateError } = require('../../utils');

const editPost = async (req, res, next) => {
  try {
    const { id } = req.params;

    await postIdSchema.validateAsync(id);

    const post = await selectPostById(id);

    if (!post) {
      generateError('El post que quieres editar no existe', 404);
    }

    const loggedUserId = req.auth.id;

    if (post.userId !== loggedUserId) {
      generateError('No puedes editar este post', 401);
    }

    await editPostSchema.validateAsync(req.body);

    const updatedPost = { ...post, ...req.body };

    await updatePostById(updatedPost);

    res.status(200).send({ status: 'ok', data: updatedPost });
  } catch (error) {
    next(error);
  }
};

module.exports = editPost;
