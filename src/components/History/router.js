const { Router } = require('express');
const HistoryComponent = require('.');

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
router.post('/', isAuth.checkAuthenticated, HistoryComponent.history);

module.exports = router;
