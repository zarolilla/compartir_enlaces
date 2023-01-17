const {
  selectLikeByPostAndUser,
  insertLike,
  deleteLike,
} = require('../../repositories/likes');
const { selectPostById } = require('../../repositories/posts');
const { postIdSchema } = require('../../schemas/posts');
const { generateError } = require('../../utils');

const togglePostLike = async (req, res, next) => {
  try {
    const { id: postId } = req.params;

    await postIdSchema.validateAsync(postId);

    const post = await selectPostById(postId);

    if (!post) {
      generateError('el post que quieres dar like no existe', 404);
    }

    const loggedUserId = req.auth.id;

    const like = await selectLikeByPostAndUser(postId, loggedUserId);

    let liked;
    let statusCode;

    if (like) {
      deleteLike(postId, loggedUserId);
      liked = false;
      statusCode = 200;
    } else {
      insertLike(postId, loggedUserId);
      liked = true;
      statusCode = 201;
    }

    res.status(statusCode).send({ status: 'ok', data: { liked } });
  } catch (error) {
    next(error);
  }
};

module.exports = togglePostLike;
