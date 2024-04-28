// postRoutes.js 
const express = require('express');
const router = express.Router();
//deletion
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

// Route to delete a post (protected route)
router.delete('/:id', verifyToken, (req, res) => {
    const postId = req.params.id;
    const userId = req.userId;

    // Check if the post belongs to the logged-in user
    const checkOwnershipQuery = 'SELECT * FROM posts WHERE id = ? AND user_id = ?';
    req.db.query(checkOwnershipQuery, [postId, userId], (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Failed to delete post' });
        } else if (result.length === 0) {
            res.status(403).json({ message: 'You are not authorized to delete this post' });
        } else {
            const deletePostQuery = 'DELETE FROM posts WHERE id = ?';
            req.db.query(deletePostQuery, [postId], (err, result) => {
                if (err) {
                    res.status(500).json({ message: 'Failed to delete post' });
                } else {
                    res.json({ message: 'Post deleted successfully' });
                }
            });
        }
    });
});

module.exports = router;
