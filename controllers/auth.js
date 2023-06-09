const User = require('../models/user');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

exports.signup = (req, res, next) => {
    const err = validationResult(req);
    if(!err.isEmpty()){
        const error = new Error('validation failed!');
        error.statusCode = 422;
        error.data = err.array();
        throw error;
    }

    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    bcrypt.hash(password, 12)
        .then(hashedPw=>{
            const user = new User({
                email: email,
                name: name,
                password: hashedPw,
            });

            return user.save();
        })
        .then(result=>{
            res.status(201).json({
                message: 'user created!',
                userId: result._id
            });
        })
        .catch(err=>{
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });


}