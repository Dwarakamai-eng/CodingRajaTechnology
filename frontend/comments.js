// Comments.js
import React, { useState } from 'react';
import axios from 'axios';

const Comments = ({ postId, comments: initialComments, onUpdateComments }) => {
  const [newComment, setNewComment] = useState('');

  const handleAddComment = async event => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/comments', { postId, text: newComment });
      const updatedComments = [...initialComments, response.data];
      onUpdateComments(updatedComments);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
      // Handle error
    }
  };

  return (
    <div>
      <h2>Comments</h2>
      {initialComments.map(comment => (
        <div key={comment.id}>
          <p>{comment.text}</p>
          {/* Display other comment details like author, timestamp, etc. */}
        </div>
      ))}
      {/* Form for adding new comments */}
      <form onSubmit={handleAddComment}>
        <textarea placeholder="Add Comment" value={newComment} onChange={e => setNewComment(e.target.value)} />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default Comments;
