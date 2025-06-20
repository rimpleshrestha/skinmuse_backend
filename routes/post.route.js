const express = require("express");
const router = express.Router();
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} = require("../controller/post.controller.js");
const { Authenticate } = require("../middleware/VerifyJWT.js");

// Create a new post
router.post("/", Authenticate, createPost);

// Get all posts
router.get("/", getAllPosts);

// Get a single post by ID
router.get("/:id", getPostById);

// Update a post by ID
router.put("/:id", Authenticate, updatePost);

// Delete a post by ID
router.delete("/:id", Authenticate, deletePost);

module.exports = router;
