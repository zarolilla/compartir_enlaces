const { insertPost } = require('../../repositories/posts');
const { createPostSchema } = require('../../schemas/posts');

const createPost = async (req, res, next) => {
  try {
    const userId = req.auth.id;

    await createPostSchema.validateAsync(req.body);

    const { title, description, link } = req.body;

    const insertedPostId = await insertPost({
      title,
      description,
      link,
      userId,
    });

    res.status(201).send({
      status: 'ok',
      data: {
        id: insertedPostId,
        title,
        description,
        link,
        userId,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createPost;
