import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditPost = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const { id } = useParams(); // Gets the ID from the URL
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/blogs`);
        // Find the specific blog from the list or add a single GET route later
        const blog = response.data.find(b => b._id === id);
        setTitle(blog.title);
        setAuthor(blog.author);
        setContent(blog.content);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };
    fetchBlog();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/blogs/${id}`, { title, author, content });
      navigate('/');
    } catch (error) {
        console.error(error);
        alert("Failed to update post");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Edit Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full p-3 border rounded-lg" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Title" required />
        <input className="w-full p-3 border rounded-lg" value={author} onChange={(e)=>setAuthor(e.target.value)} placeholder="Author" required />
        <textarea rows="6" className="w-full p-3 border rounded-lg" value={content} onChange={(e)=>setContent(e.target.value)} required></textarea>
        <button type="submit" className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700">Update Post</button>
      </form>
    </div>
  );
};

export default EditPost;