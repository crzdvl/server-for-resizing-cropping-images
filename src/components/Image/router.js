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
 * Route for resize image.
 * @name /v1/image/resize
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/resize', isAuth.checkAuthenticated, ImageComponent.resizeImage);

/**
 * Route for crop image.
 * @name /v1/image/crop
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/crop', isAuth.checkAuthenticated, ImageComponent.cropImage);

module.exports = router;
