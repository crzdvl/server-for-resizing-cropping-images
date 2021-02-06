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
 * Route for download csv history of image operations.
 * @name /v1/history/csv
 */
router.get('/csv', isAuth.checkAuthenticated, HistoryComponent.historyCsv);

/**
 * Route for getting sorted list of user with information about operations.
 * @name /v1/history/sum
 */
router.get('/sum/:page', isAuth.checkAuthenticated, HistoryComponent.sumOperationsStatistic);

/**
 * Route for getting average statistic of size dowloading files and params operations.
 * @name /v1/history/avg
 */
router.get('/avg', isAuth.checkAuthenticated, HistoryComponent.averageStatisticOfFileSize);

/**
 * Route for view history of image operations with a specified time.
 * @name /v1/history/
 */
router.get('/:page', isAuth.checkAuthenticated, HistoryComponent.historyByDateAndEmail);

/**
 * Route for getting average statistic of params operations grouped in days.
 * @name /v1/history/avgUnique
 */
router.post('/avgUnique', isAuth.checkAuthenticated, HistoryComponent.avgOperationsStatisticByDayByEmail);
module.exports = router;
