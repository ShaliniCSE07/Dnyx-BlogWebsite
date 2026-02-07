import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/blogs');
      setBlogs(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // DELETE function
  const deleteBlog = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await axios.delete(`http://localhost:5000/api/blogs/${id}`);
        // Refresh the list after deleting
        fetchBlogs();
      } catch (error) {
        console.error("Error deleting blog:", error);
        alert("Failed to delete the post");
      }
    }
  };

  if (loading) return <div className="text-center mt-20 italic">Loading your stories...</div>;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
      {blogs.map((blog) => (
        <div key={blog._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">{blog.title}</h3>
            <p className="text-gray-600 line-clamp-3 mb-4">{blog.content}</p>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center">
            <span className="text-xs font-semibold text-blue-500 uppercase tracking-wider">{blog.author}</span>
            
            <Link 
  to={`/edit/${blog._id}`} 
  className="text-blue-500 hover:text-blue-700 text-sm font-medium mr-4"
>
  Edit
</Link>
            <button 
              onClick={() => deleteBlog(blog._id)}
              className="text-red-500 hover:text-red-700 text-sm font-medium transition"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;