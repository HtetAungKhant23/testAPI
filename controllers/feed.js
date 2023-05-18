const Post = require('../models/feed');
const User = require('../models/user');
const { validationResult } = require('express-validator');

exports.getPosts = (req, res, next) => {
    Post.find()
        .then(users => {
            res.status(200).json({
                message: 'users fatched!',
                user: users
            })
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.getPost = (req, res, next) => {

    const userId = req.params.userId;
    Post.findById(userId)
        .then(user => {
            if(!user){
                const err = new Error('user cannot find in db');
                err.statusCode = 404;
                throw err;
            }
            res.status(200).json({
                message: 'user founded',
                user: user
            });
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
                next(err);
            }
        });

}


exports.createPost = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new Error('Validation Failed!');
        error.statusCode = 422;
        throw error;
    }

    const myName = req.body.name;
    const myEmail = req.body.email;
    let imgUrl = req.body.image;
    
    if(req.file){
        imgUrl = req.file.path.replace('\\','/');
    }
    if(!imgUrl){
        const err = new Error('image is not provited');
        err.statusCode = 422;
        throw err;
    }

    const post = new Post({
        name: myName,
        email: myEmail,
        img: imgUrl
    });

    post.save()
        .then(result => {
            console.log(result);
            return res
                .status(201)
                .json({
                    message: 'successfully posted!',
                    post: result
                });
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });

}

exports.imgPost = (req, res, next) => {
    const image = req.file;
    console.log(image);
}



exports.signup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    
}   