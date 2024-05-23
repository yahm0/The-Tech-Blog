const express = require('express');
const router = express.Router();
const { Post, User } = require('../models');
const bcrypt = require('bcrypt');

// Homepage route
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('homepage', {
            posts,
            title: 'Home',
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Dashboard route
router.get('/dashboard', async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id,
            },
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('dashboard', {
            posts,
            title: 'Dashboard',
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Login route
router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});

// Signup route
router.get('/signup', (req, res) => {
    res.render('signup', { title: 'Sign Up' });
});

// Handle signup form submission
router.post('/signup', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });
        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.logged_in = true;
            res.redirect('/'); // Redirect to homepage after signup
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
