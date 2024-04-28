// controllers/postController.js
const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id; // Assuming user ID is available in request after authentication

  try {
    const postId = await Post.createPost(title, content, userId);
    res.json({ postId });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create post' });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.getAllPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch posts' });
  }
};
