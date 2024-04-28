// Tags.js
import React, { useState } from 'react';
import axios from 'axios';

const Tags = ({ postId, tags: initialTags, onUpdateTags }) => {
  const [newTag, setNewTag] = useState('');

  const handleAddTag = async event => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/tags', { postId, name: newTag });
      const updatedTags = [...initialTags, response.data];
      onUpdateTags(updatedTags);
      setNewTag('');
    } catch (error) {
      console.error('Error adding tag:', error);
      // Handle error
    }
  };

  return (
    <div>
      <h2>Tags</h2>
      <ul>
        {initialTags.map(tag => (
          <li key={tag.id}>{tag.name}</li>
        ))}
      </ul>
      {/* Form for adding new tags */}
      <form onSubmit={handleAddTag}>
        <input type="text" placeholder="Add Tag" value={newTag} onChange={e => setNewTag(e.target.value)} />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default Tags;
