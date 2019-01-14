const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

router.get('/', (req, res) => {
    Blog.find().then(blogs => {
        res.status(200).json(blogs);
    });
});

router.get('/featured', (req, res) => {
    Blog.find()
        .where('featured')
        .equals(true)
        .then(blogs => {
            blogs
                ? res.status(200).json(blogs)
                : res.status(404).send('404 Blog not found');
        });
});

router.get('/:id', (req, res) => {
    let id = req.params.id;
    Blog.findById(id).then(blog => {
        blog
            ? res.status(200).json(blog)
            : res.status(404).send('404 Blog not found');
    });
});

router.post('/', (req, res) => {
    let newBlog = new Blog(req.body);
    newBlog.save((err, blog) => {
        err ? res.status(404).send(err) : res.status(201).json(blog);
    });
});

router.put('/:id', (req, res) => {
    let id = req.params.id;
    let update = req.body;
    Blog.findByIdAndUpdate(id, { $set: update }, (err, blog) => {
        err ? console.log(err) : res.status(204).json(blog);
    });
});

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    Blog.findByIdAndRemove(id, (err, blog) => {
        err ? console.log(err) : res.status(200).json(blog);
    });
});

module.exports = router;
