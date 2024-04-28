// postRoutes.js
const express = require('express');
const router = express.Router();

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.userId = decoded.userId;
        next();
    });
};

// Route to update a post (protected route)
router.put('/:id', verifyToken, (req, res) => {
    const postId = req.params.id;
    const userId = req.userId;
    const { title, content } = req.body;
    
    // Check if the post belongs to the logged-in user
    const checkOwnershipQuery = 'SELECT * FROM posts WHERE id = ? AND user_id = ?';
    req.db.query(checkOwnershipQuery, [postId, userId], (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Failed to update post' });
        } else if (result.length === 0) {
            res.status(403).json({ message: 'You are not authorized to update this post' });
        } else {
            const updatePostQuery = 'UPDATE posts SET title = ?, content = ? WHERE id = ?';
            req.db.query(updatePostQuery, [title, content, postId], (err, result) => {
                if (err) {
                    res.status(500).json({ message: 'Failed to update post' });
                } else {
                    res.json({ message: 'Post updated successfully' });
                }
            });
        }
    });
});

module.exports = router;
