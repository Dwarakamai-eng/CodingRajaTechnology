// models/User.js
const db = require('../config/db');

class User {
  static async createUser(username, password) {
    try {
      const [result] = await db.execute('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  static async getUserByUsername(username) {
    try {
      const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User;
