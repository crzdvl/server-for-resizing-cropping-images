const { Router } = require('express');
const ImageComponent = require('.');

const isAuth = require('../../polices/isAuth');

/**
 * Express router to mount books related functions on.
 * @type {Express.Router}
 * @const
 */
const router = Router();

/**
 * Route for view history of image operations.
 * @name /v1/image/history
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/history', isAuth.checkAuthenticated, ImageComponent.history);

module.exports = router;
