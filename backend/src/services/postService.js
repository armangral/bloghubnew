import { PrismaClient } from "@prisma/client";
import { NotFoundError, AuthorizationError } from "../utils/errors.js";

const prisma = new PrismaClient();

export const createPost = async (postData, authorId) => {
  const { title, content } = postData;
  return prisma.post.create({
    data: { title, content, authorId },
    include: { author: { select: { name: true } } },
  });
};

/**
 * Get all posts with optional searching and sorting.
 * @param {object} query - The query parameters from the request.
 * @param {string} query.search - The search term.
 * @param {'newest' | 'oldest' | 'title'} query.sort - The sorting order.
 */

export const getAllPosts = async (query) => {
  const { search = "", sort = "newest", skip = 0, limit = 10 } = query;

  const take = Number(limit) || 10;
  const skipRecords = Number(skip) || 0;

  const orderBy = {};
  if (sort === "oldest") orderBy.createdAt = "asc";
  else if (sort === "title") orderBy.title = "asc";
  else orderBy.createdAt = "desc"; // default to newest

  const where = search
    ? {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { content: { contains: search, mode: "insensitive" } },
        ],
      }
    : {};

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      orderBy,
      skip: skipRecords,
      take,
      include: {
        author: { select: { name: true, email: true } },
      },
    }),
    prisma.post.count({ where }),
  ]);

  return {
    success: true,
    data: posts,
    metadata: {
      total_elements: total,
    },
  };
};

export const getMyPosts = async (userId, query = {}) => {
  const { skip = 0, limit = 10 } = query;

  const skipRecords = Number(skip) || 0;
  const take = Number(limit) || 10;

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where: { authorId: userId },
      skip: skipRecords,
      take,
    }),
    prisma.post.count({ where: { authorId: userId } }),
  ]);

  return {
    data: posts,
    metadata: {
      total_elements: total,
    },
  };
};

export const getPostById = async (postId) => {
  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: { author: { select: { name: true, email: true } } },
  });

  if (!post) {
    throw new NotFoundError("No post found with that ID.");
  }

  return post;
};

export const updatePost = async (postId, userId, updateData) => {
  const post = await prisma.post.findUnique({ where: { id: postId } });

  if (!post) {
    throw new NotFoundError("The post you're trying to update does not exist.");
  }

  if (post.authorId !== userId) {
    throw new AuthorizationError("You are not authorized to edit this post.");
  }

  return prisma.post.update({
    where: { id: postId },
    data: updateData,
    include: { author: { select: { name: true } } },
  });
};

export const deletePost = async (postId, userId) => {
  const post = await prisma.post.findUnique({ where: { id: postId } });

  if (!post) {
    throw new NotFoundError("The post you're trying to delete does not exist.");
  }

  if (post.authorId !== userId) {
    throw new AuthorizationError("You are not authorized to delete this post.");
  }

  await prisma.post.delete({ where: { id: postId } });
};
