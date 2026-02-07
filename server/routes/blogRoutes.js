const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// 1. GET all blogs
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 2. POST a new blog
router.post('/', async (req, res) => {
    const blog = new Blog({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    });
    try {
        const newBlog = await blog.save();
        res.status(201).json(newBlog);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 3. DELETE a blog
router.delete('/:id', async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id);
        res.json({ message: "Blog deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 4. UPDATE a blog
// server/routes/blogRoutes.js

router.put('/:id', async (req, res) => {
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true } 
        );
        if (!updatedBlog) return res.status(404).json({ message: "Blog not found" });
        res.json(updatedBlog);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get a single blog by ID
router.get('/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        res.json(blog);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;