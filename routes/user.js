const controllers = require('../controllers/auth');
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const User = require('../models/user');


router.put('/signup',
[
    body('email')
        .isEmail()
        .withMessage('email format is uncorrect!')
        .normalizeEmail()
        .custom((vlaue, {req})=>{
            return User.findOne({email: vlaue})
                .then(userDoc => {
                    if(userDoc){
                        return Promise.reject('User email is already exist!');
                    }
                })
        }),
    body('password')
        .trim()
        .isLength({min: 6})
        .not()
        .isLowercase()
        .not()
        .isUppercase()
        .not()
        .isNumeric()
        .not()
        .isAlpha()
        .withMessage('password is not strong!'),
    body('name')
        .trim()
        .not()
        .isEmpty()
]
,controllers.signup);

module.exports = router;