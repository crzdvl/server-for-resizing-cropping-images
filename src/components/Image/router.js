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
*/
router.post('/edit', isAuth.checkAuthenticated, ImageComponent.editImage);

module.exports = router;
