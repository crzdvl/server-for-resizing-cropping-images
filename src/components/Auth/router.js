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
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.post('/signup', isAuth.checkNotAuthenticated, AuthComponent.signup);

/**
 * Route for login user.
 * @name /v1/auth/login
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.post('/login', isAuth.checkNotAuthenticated, AuthComponent.login);

/**
 * Route for logout user.
 * @name /v1/auth/logout
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.get('/logout', isAuth.checkAuthenticated, AuthComponent.logout);

/**
 * Route for login with google.
 * @name /v1/auth/google
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

/**
 *
 * @name /v1/auth/google/callback
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.get('/google/callback', AuthComponent.googleCallback);

module.exports = router;
