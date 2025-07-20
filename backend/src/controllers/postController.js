import asyncHandler from "express-async-handler";
import * as postService from "../services/postService.js";

// @desc    Create a new post
// @route   POST /api/v1/posts
// @access  Private
export const createPost = asyncHandler(async (req, res) => {
  const post = await postService.createPost(req.body, req.user.id);
  res.status(201).json({ success: true, data: post });
});

// @desc    Get all posts
// @route   GET /api/v1/posts
// @access  Public
export const getAllPosts = asyncHandler(async (req, res) => {
  // Pass query params to the service
  const posts = await postService.getAllPosts(req.query);
  res.status(200).json({ success: true, count: posts.length, data: posts });
});

export const getMyPosts = asyncHandler(async (req, res) => {
  const result = await postService.getMyPosts(req.user.id, req.query);
  res.status(200).json({ success: true, ...result });
});

// @desc    Get a single post by its ID
// @route   GET /api/v1/posts/:id
// @access  Public
export const getPostById = asyncHandler(async (req, res) => {
  const post = await postService.getPostById(req.params.id);
  res.status(200).json({ success: true, data: post });
});

// @desc    Update a post
// @route   PUT /api/v1/posts/:id
// @access  Private (Owner only)
export const updatePost = asyncHandler(async (req, res) => {
  const updatedPost = await postService.updatePost(
    req.params.id,
    req.user.id,
    req.body
  );
  res.status(200).json({ success: true, data: updatedPost });
});

// @desc    Delete a post
// @route   DELETE /api/v1/posts/:id
// @access  Private (Owner only)
export const deletePost = asyncHandler(async (req, res) => {
  await postService.deletePost(req.params.id, req.user.id);
  res.status(200).json({ success: true, message: "Post deleted successfully" });
});
