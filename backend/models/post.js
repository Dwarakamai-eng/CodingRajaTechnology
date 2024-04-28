// models/Post.js
const db = require('../config/db');

class Post {
  static async createPost(title, content, userId) {
    try {
      const [result] = await db.execute('INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)', [title, content, userId]);
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  static async getAllPosts() {
    try {
      const [rows] = await db.execute('SELECT * FROM posts');
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Implement other CRUD operations as needed
}

module.exports = Post;
