const { Router } = require('express');
const ImageComponent = require('.');

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
router.post('/history', ImageComponent.history);

/**
 * Route for resize image.
 * @name /v1/image/resize
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/resize', ImageComponent.resizeImage);

/**
 * Route for crop image.
 * @name /v1/image/crop
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/crop', ImageComponent.cropImage);

module.exports = router;
