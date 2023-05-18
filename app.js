const express = require('express');
const mongoose = require('mongoose');
const feedRoute = require('./routes/feed');
const authRoute = require('./routes/user');
const path = require('path');

const multer = require('multer');
const uuidV4 = require('uuid');

const app = express();

const fileStorage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, 'images');
    },
    filename:(req, file, cb) => {
        cb(null, uuidV4.v4() + "-" + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
        cb(null, true);
    }else{
        db(null, false);
    }
}

app.use(express.json());
app.use('/images', express.static(path.join('__dirname', 'images')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Method', 'GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Header', 'Content-Type, Authorization');
    next();
});

app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));

app.use('/api', feedRoute);
app.use('/auth', authRoute);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({
        message: message,
        data: data
    });
});


mongoose.connect(
    'mongodb+srv://root:root@cluster0.ksor6cg.mongodb.net/firstAPIdb?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
.then(result => {
    console.log('connected!');
    app.listen(5000);
})
.catch(err => console.log(err));