// PostForm.js
import React, { useState } from 'react';
import axios from 'axios';

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    axios.post('/api/posts', { title, content })
      .then(response => {
        console.log('Post created successfully:', response.data);
        // Reset form fields
        setTitle('');
        setContent('');
      })
      .catch(error => console.error('Error creating post:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Post</h2>
      <label>Title:</label><br />
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} /><br />
      <label>Content:</label><br />
      <textarea value={content} onChange={e => setContent(e.target.value)} /><br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default PostForm;
