const express = require("express");
const router = express.Router();
const verifyJWT = require("../middleware/verifyJWT");
const postsController = require("../controllers/postsController");

// Get all posts from newest to oldest
router.get("/", verifyJWT, postsController.getAllPosts);

// Get all posts of a specific user
router.get("/user/:userId", verifyJWT, postsController.getAllPostsByUser);

// Create a new post
router.post("/", verifyJWT, postsController.createPost);

// Update a post
router.put("/:postId", verifyJWT, postsController.updatePost);

// Delete a post
router.delete("/:postId", verifyJWT, postsController.deletePost);

module.exports = router;
