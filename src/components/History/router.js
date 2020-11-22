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
 * Route for view history of image operations with a specified time.
 * @name /v1/history/
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/', isAuth.checkAuthenticated, HistoryComponent.history);

/**
 * Route for download csv history of image operations.
 * @name /v1/history/csv
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/csv', isAuth.checkAuthenticated, HistoryComponent.historyCsv);

/**
 * Route for getting average statistic of size dowloading files and params operations.
 * @name /v1/history/avg
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/avg', isAuth.checkAuthenticated, HistoryComponent.averageStatistic);

/**
 * Route for getting average statistic of params operations grouped in days.
 * @name /v1/history/avgUnique
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/avgUnique', isAuth.checkAuthenticated, HistoryComponent.AvgOperationsStatistic);

/**
 * Route for getting sorted list of user with information about operations.
 * @name /v1/history/sum
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/sum', isAuth.checkAuthenticated, HistoryComponent.SumOperationsStatistic);

module.exports = router;
