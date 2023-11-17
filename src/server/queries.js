import HttpError from '@wasp/core/HttpError.js'

export const getPosts = async (args, context) => {
  return context.entities.Post.findMany({
    select: {
      id: true,
      title: true,
      user: {
        select: {
          username: true
        }
      }
    }
  });
}

export const getPost = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const post = await context.entities.Post.findUnique({
    where: { id: args.id },
    include: {
      user: true,
      comments: {
        include: { user: true }
      }
    }
  });

  if (!post) { throw new HttpError(404, 'No post with id ' + args.id) };

  return post;
}