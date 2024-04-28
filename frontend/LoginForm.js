// LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    axios.post('/api/auth/login', { username, password })
      .then(response => {
        console.log('Login successful:', response.data);
        // Store token in local storage or session storage
      })
      .catch(error => console.error('Login failed:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <label>Username:</label><br />
      <input type="text" value={username} onChange={e => setUsername(e.target.value)} /><br />
      <label>Password:</label><br />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} /><br />
      {loading && <div>Loading...</div>}
      {error && <div className="error">{error}</div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
