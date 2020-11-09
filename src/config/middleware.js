const cors = require('cors');
const helmet = require('helmet');
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const multer = require('multer');
const storageConfig = require('./image-storage-config');

module.exports = {
    /**
     * @function
     * @description express middleware
     * @param {express.Application} app
     * @returns void
     */
    init(app) {
        // eslint-disable-next-line global-require
        require('dotenv').config();
        // configure .env
        app.use(
            bodyParser.urlencoded({
                extended: true,
            }),
        );
        app.use(bodyParser.json());
        // middleware for handling multipart/form-data
        app.use(multer({
            storage: storageConfig,
            fileFilter: (req, file, next) => {
                if (!/\.(jpe?g|png)$/i.test(file.originalname)) {
                    req.err = 'That file extension is not accepted!';
                    next(null, false);
                }
                next(null, true);
            },
        }).single('image'));
        // connect static file
        app.use(express.static('public'));
        // parse Cookie header and populate req.cookies with an object keyed by the cookie names.
        app.use(cookieParser());
        // returns the compression middleware
        app.use(compression());
        // helps you secure your Express apps by setting various HTTP headers
        app.use(helmet());
        // providing a Connect/Express middleware that
        // can be used to enable CORS with various options
        app.use(cors());
        // cors
        app.use(session({
            secret: process.env.SECRET_CODE,
            resave: false,
            saveUninitialized: true,
            cookie: { secure: false },
        }));
        app.use(passport.initialize());
        app.use(passport.session());
        require('./passport-strategies/passport-config')(passport);
        require('./passport-strategies/passport-02Auth')(passport);
        require('./passport-strategies/passport-facebook')(passport);
        // conf
        app.use((req, res, next) => {
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS ');
            res.header('Access-Control-Allow-Credentials', '*');
            res.header(
                'Access-Control-Allow-Headers',
                'Origin, X-Requested-With,'
                + ' Content-Type, Accept,'
                + ' Authorization,'
                + ' Access-Control-Allow-Credentials',
            );
            next();
        });
    },
};
