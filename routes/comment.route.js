// routes/commentRoutes.js
const {
  createComment,
  getAllComments,
  getCommentById,
  updateComment,
  deleteComment,
} = require("../controller/comment.controller.js");
const { Authenticate } = require("../middleware/VerifyJWT.js");

const express = require("express");
const router = express.Router();
router.post("/:postId", Authenticate, createComment);

// Get all comments for the authenticated user
router.get("/", Authenticate, getAllComments);

// Get a single comment by ID
router.get("/:id", Authenticate, getCommentById);

// Update a comment by ID
router.put("/:id", Authenticate, updateComment);

// Delete a comment by ID
router.delete("/:id", Authenticate, deleteComment);

module.exports = router;
