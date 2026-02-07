import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost'; // Import the new page
import EditPost from './pages/EditPost';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto p-4 lg:p-8">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Now using the actual component instead of the placeholder */}
          <Route path="/create" element={<CreatePost />} />
          <Route path="/edit/:id" element={<EditPost />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;