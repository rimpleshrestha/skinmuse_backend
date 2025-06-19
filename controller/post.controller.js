const Post = require("../model/post.model.js");

async function createPost(req, res) {
  try {
    const { title, description, image, skin_type } = req.body;
    const userId = req.user;
    const newPost = new Post({
      title,
      description,
      image,
      user: userId,
      skin_type,
    });
    const saved = await newPost.save();
    return res.status(201).json({
      message: "Post created successfully",
      post: saved,
    });
  } catch (err) {
    console.error("Error creating post:", err);
    return res
      .status(500)
      .json({ message: "Server error while creating post" });
  }
}

async function getAllPosts(req, res) {
  try {
    const posts = await Post.find();
    return res.json({
      message: "Posts fetched successfully",
      posts,
    });
  } catch (err) {
    console.error("Error fetching posts:", err);
    return res
      .status(500)
      .json({ message: "Server error while fetching posts" });
  }
}

async function getPostById(req, res) {
  try {
    const post = await Post.findOne({
      _id: req.params.id,
    });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.json({
      message: "Post fetched successfully",
      post,
    });
  } catch (err) {
    console.error("Error fetching post:", err);
    return res
      .status(500)
      .json({ message: "Server error while fetching post" });
  }
}

async function updatePost(req, res) {
  try {
    const userId = req.user;
    const { title, description, image, skin_type } = req.body;
    const updated = await Post.findOneAndUpdate(
      { _id: req.params.id, user: userId },
      { title, description, image, skin_type },
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res
        .status(404)
        .json({ message: "Post not found or not owned by user" });
    }
    return res.json({
      message: "Post updated successfully",
      post: updated,
    });
  } catch (err) {
    console.error("Error updating post:", err);
    return res
      .status(500)
      .json({ message: "Server error while updating post" });
  }
}

async function deletePost(req, res) {
  try {
    const userId = req.user;
    const deleted = await Post.findOneAndDelete({
      _id: req.params.id,
      user: userId,
    });
    if (!deleted) {
      return res
        .status(404)
        .json({ message: "Post not found or not owned by user" });
    }
    return res.json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error("Error deleting post:", err);
    return res
      .status(500)
      .json({ message: "Server error while deleting post" });
  }
}

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
