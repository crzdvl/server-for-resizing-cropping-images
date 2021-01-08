const { Router } = require('express');
const passport = require('passport');
const AuthComponent = require('.');

const isAuth = require('../../polices/isAuth');

/**
 * Express router to mount books related functions on.
 * @type {Express.Router}
 * @const
 */
const router = Router();

/**
 * Route for registration user.
 * @name /v1/auth/signup
 */
router.post('/signup', isAuth.checkNotAuthenticated, AuthComponent.signup);

/**
 * Route for login user.
 * @name /v1/auth/login
 */
router.post('/login', isAuth.checkNotAuthenticated, AuthComponent.login);

/**
 * Route for logout user.
 * @name /v1/auth/logout
 */
router.get('/logout', isAuth.checkAuthenticated, AuthComponent.logout);

/**
 * Route for login with google.
 * @name /v1/auth/google
 */
router.get('/google', isAuth.checkNotAuthenticated, passport.authenticate('google', { scope: ['profile', 'email'] }));

/**
 *
 * @name /v1/auth/google/callback
 * @function
 */
router.get('/google/callback', isAuth.checkNotAuthenticated, AuthComponent.googleCallback);

module.exports = router;
