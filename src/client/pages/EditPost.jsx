import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getPost from '@wasp/queries/getPost';
import editPost from '@wasp/actions/editPost';

export function EditPost() {
  const { postId } = useParams();
  const { data: post, isLoading, error } = useQuery(getPost, { id: postId });
  const editPostFn = useAction(editPost);
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleEditPost = () => {
    editPostFn({ id: postId, title, content });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Edit Post</h2>
      <div className="my-4">
        <label htmlFor="title" className="block font-bold mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          className="border border-gray-400 p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="my-4">
        <label htmlFor="content" className="block font-bold mb-2">
          Content
        </label>
        <textarea
          id="content"
          className="border border-gray-400 p-2 rounded"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
      <button
        onClick={handleEditPost}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Save
      </button>
      <Link to={`/post/${postId}`} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">
        Cancel
      </Link>
    </div>
  );
}