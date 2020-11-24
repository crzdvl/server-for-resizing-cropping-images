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
 * @name /v1/image/edit
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/edit', isAuth.checkAuthenticated, ImageComponent.editImage);

module.exports = router;
