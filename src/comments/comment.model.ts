import { objectType, extendType, nonNull, stringArg, intArg } from 'nexus';

export const Post = objectType({
  name: 'Post',
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.string('title');
    t.nonNull.string('content');
    t.nonNull.list.nonNull.field('comments', {
      type: 'Comment',
      resolve: (parent, _, ctx) => {
        return ctx.prisma.post
          .findUnique({
            where: { id: parent.id },
          })
          .comments();
      },
    });
  },
});

export const Comment = objectType({
  name: 'Comment',
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.string('content');
    t.nonNull.field('post', {
      type: 'Post',
      resolve: (parent, _, ctx) => {
        return ctx.prisma.comment
          .findUnique({
            where: { id: parent.id },
          })
          .post();
      },
    });
  },
});

export const PostQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('posts', {
      type: 'Post',
      resolve: (_, __, ctx) => {
        return ctx.prisma.post.findMany();
      },
    });
    t.field('post', {
      type: 'Post',
      args: {
        id: nonNull(intArg()),
      },
      resolve: (_, { id }, ctx) => {
        return ctx.prisma.post.findUnique({
          where: { id },
        });
      },
    });
  },
});

export const PostMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createPost', {
      type: 'Post',
      args: {
        title: nonNull(stringArg()),
        content: nonNull(stringArg()),
      },
      resolve: (_, { title, content }, ctx) => {
        return ctx.prisma.post.create({
          data: {
            title,
            content,
          },
        });
      },
    });
  },
});

export const CommentMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createComment', {
      type: 'Comment',
      args: {
        content: nonNull(stringArg()),
        postId: nonNull(intArg()),
      },
      resolve: (_, { content, postId }, ctx) => {
        return ctx.prisma.comment.create({
          data: {
            content,
            post: {
              connect: { id: postId },
            },
          },
        });
      },
    });
  },
});
