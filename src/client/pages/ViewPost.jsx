import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getPost from '@wasp/queries/getPost';
import createComment from '@wasp/actions/createComment';

export function ViewPost() {
  const { postId } = useParams();
  const { data: post, isLoading, error } = useQuery(getPost, { id: postId });
  const createCommentFn = useAction(createComment);
  const [newComment, setNewComment] = useState('');

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCreateComment = () => {
    createCommentFn({ postId, content: newComment });
    setNewComment('');
  };

  return (
    <div>
      <h1>{post.title}</h1>
      <p>Author: {post.user.username}</p>
      <p>{post.content}</p>

      <h2>Comments:</h2>
      {post.comments.map((comment) => (
        <div key={comment.id}>
          <p>{comment.content}</p>
          <p>By: {comment.user.username}</p>
        </div>
      ))}

      <h2>Create Comment:</h2>
      <input
        type='text'
        placeholder='Comment'
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button onClick={handleCreateComment}>Add Comment</button>
      <Link to={`/edit-post/${postId}`}>Edit Post</Link>
    </div>
  );
}