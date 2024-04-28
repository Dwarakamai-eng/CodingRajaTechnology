// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const postRoutes = require('./routes/postRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password', // Replace with your MySQL password
    database: 'blog'
});

db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('Connected to MySQL database');
});

app.use((req, res, next) => {
    req.db = db;
    next();
});

app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// authRoutes.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();

const secretKey = 'secret'; // Replace with your secret key
const saltRounds = 10;

// Route for user registration
router.post('/register', (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
    req.db.query(sql, [username, hashedPassword], (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Registration failed' });
        } else {
            res.status(201).json({ message: 'User registered successfully' });
        }
    });
});

// Route for user login
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM users WHERE username = ?';
    req.db.query(sql, [username], (err, result) => {
        if (err || result.length === 0) {
            res.status(401).json({ message: 'Invalid username or password' });
        } else {
            const user = result[0];
            if (bcrypt.compareSync(password, user.password)) {
                const token = jwt.sign({ userId: user.id }, secretKey);
                res.json({ token });
            } else {
                res.status(401).json({ message: 'Invalid username or password' });
            }
        }
    });
});

module.exports = router;

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

// Route to get all posts
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM posts';
    req.db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Failed to fetch posts' });
        } else {
            res.json(result);
        }
    });
});

// Route to create a new post (protected route)
router.post('/', verifyToken, (req, res) => {
    const { title, content } = req.body;
    const userId = req.userId;
    const sql = 'INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)';
    req.db.query(sql, [title, content, userId], (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Failed to create post' });
        } else {
            res.status(201).json({ message: 'Post created successfully' });
        }
    });
});

// Route to update a post (protected route)
router.put('/:id', verifyToken, (req, res) => {
    // Implement update post functionality
});

// Route to delete a post (protected route)
router.delete('/:id', verifyToken, (req, res) => {
    // Implement delete post functionality
});

module.exports = router;
