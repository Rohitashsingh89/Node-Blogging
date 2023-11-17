import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import getPosts from '@wasp/queries/getPosts';
import createComment from '@wasp/actions/createComment';

export function Home() {
  const { data: posts, isLoading, error } = useQuery(getPosts);
  const createCommentFn = useAction(createComment);
  const [newComment, setNewComment] = useState('');

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCreateComment = (postId) => {
    createCommentFn({ postId, content: newComment });
    setNewComment('');
  };

  return (
    <div className='p-4'>
      {posts.map((post) => (
        <div
          key={post.id}
          className='bg-gray-100 p-4 mb-4 rounded-lg'
        >
          <div>{post.title}</div>
          <div>By: {post.user.username}</div>
          <Link
            to={`/post/${post.id}`}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2'
          >
            View post
          </Link>
          <div className='mt-4'>
            {post.comments.map((comment) => (
              <div key={comment.id} className='bg-gray-200 p-2 mb-2 rounded-lg'>
                <div>{comment.content}</div>
                <div>By: {comment.user.username}</div>
              </div>
            ))}
          </div>
          <div className='mt-4'>
            <input
              type='text'
              placeholder='New Comment'
              className='px-1 py-2 border rounded text-lg'
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              onClick={() => handleCreateComment(post.id)}
              className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2'
            >
              Add Comment
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}