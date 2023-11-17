import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAction } from '@wasp/actions';
import { useQuery } from '@wasp/queries';
import createPost from '@wasp/actions/createPost';
import getPosts from '@wasp/queries/getPosts';

export function NewPost() {
  const createPostFn = useAction(createPost);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleCreatePost = () => {
    createPostFn({ title, content });
    setTitle('');
    setContent('');
  };

  return (
    <div>
      <h2>Create New Post</h2>
      <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea value={content} onChange={(e) => setContent(e.target.value)}></textarea>
      <button onClick={handleCreatePost}>Create</button>
    </div>
  );
}