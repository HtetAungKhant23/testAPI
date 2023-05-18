const express = require('express');
const { body } = require('express-validator');
const controllers = require('../controllers/feed');

const router = express.Router();

router.get('/posts', controllers.getPosts);

router.get('/post/:userId', controllers.getPost);

router.post('/posts',
[
    body('name')
        .trim()
        .isLength({min: 5}),
    body('email')
        .trim()
        .isEmail()
]
,controllers.createPost);

router.post('/imgPost', controllers.imgPost);

module.exports = router;