const Post = require("../../models/Post");

// Get all posts from newest to oldest
const getAllPosts = async (req, res) => {
  const posts = await Post.find().sort({ updatedAt: -1 }).exec();
  if (!posts) {
    return res.status(204).json({ message: "No posts found" });
  }
  res.json(posts);
};

// Get all posts of a specific user
const getAllPostsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const posts = await Post.find({ author: userId });
    if (!posts || posts.length === 0) {
      return res.status(204).json({ message: "No posts found" });
    }
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// Create a new post
const createPost = async (req, res) => {
  if (!req?.body?.title || !req?.body?.content) {
    return res.status(400).json({ message: "Missing title or content" });
  }

  try {
    const post = await new Post.create({
      content: req.body.content,
      author: req.user._id,
    });

    res.status(201).json(post);
  } catch (error) {
    console.log(error);
  }
};

// Update a post
const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    post.content = req.body.content;
    post.updatedAt = Date.now();
    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// Delete a post
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    await post.delete();
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = {
  getAllPosts,
  getAllPostsByUser,
  createPost,
  updatePost,
  deletePost,
};
