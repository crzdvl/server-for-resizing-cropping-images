const HistoryService = require('./service');
const HistoryValidation = require('./validation');
const ValidationError = require('../../error/ValidationError');
const SimpleError = require('../../error/SimpleError');

/**
 * @function history
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function history(req, res, next) {
    try {
        const { error } = await HistoryValidation.history(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        const { dateStart, dateFinish } = req.body;

        const data = await HistoryService.getHistory(dateStart, dateFinish);
        await HistoryService.create({ email: req.user.email, operation: 'history request' });

        return res.render('historyByDate.ejs', {
            csrfToken: req.csrfToken(),
            message: 'history of image operations with a specified time',
            name: req.user.firstName,
            history: data,
        });
    } catch (error) {
        if (!(error instanceof ValidationError)) {
            throw new SimpleError(500, error.message);
        }

        return next(error);
    }
}

/**
 * @function historyCsv
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function historyCsv(req, res, next) {
    try {
        const data = await HistoryService.getAllHistory();

        await HistoryService.create({ email: req.user.email, operation: 'history request' });

        const fileDate = await HistoryService.generateCsv(data);
        const filePath = `${__dirname}/../../store/history/${fileDate}.csv`;

        res.header('Content-Type', 'text/csv');
        res.attachment(filePath);
        return res.sendStatus(200);
    } catch (error) {
        throw new SimpleError(500, error.message);
    }
}

/**
 * @function averageStatistic
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function averageStatistic(req, res, next) {
    try {
        const data = await HistoryService.getAverageStatistic();

        await HistoryService.create({ email: req.user.email, operation: 'history request' });

        return res.render('history.ejs', {
            message: 'Here is average statistic of size dowloading files and params operations.',
            name: req.user.firstName,
            history: data,
        });
    } catch (error) {
        throw new SimpleError(500, error.message);
    }
}

/**
 * @function SumOperationsStatistic
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function SumOperationsStatistic(req, res, next) {
    try {
        const data = await HistoryService.getSumOperationsStatistic();

        await HistoryService.create({ email: req.user.email, operation: 'history request' });

        return res.render('history.ejs', {
            message: 'Here is sorted list of user with information about operations.',
            name: req.user.firstName,
            history: data,
        });
    } catch (error) {
        throw new SimpleError(500, error.message);
    }
}

/**
 * @function AvgOperationsStatistic
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function AvgOperationsStatistic(req, res, next) {
    try {
        const { error } = HistoryValidation.email(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        const data = await HistoryService.getAvgOperationsStatistic(req.body.email);

        await HistoryService.create({ email: req.user.email, operation: 'history request' });

        return res.render('historyByEmail.ejs', {
            name: req.user.firstName,
            history: data,
            csrfToken: req.csrfToken(),
            message: 'average statistic of params operations grouped in days for one user',
            user: req.body.email,
        });
    } catch (error) {
        if (!(error instanceof ValidationError)) {
            throw new SimpleError(500, error.message);
        }

        return next(error);
    }
}

module.exports = {
    history,
    historyCsv,
    averageStatistic,
    SumOperationsStatistic,
    AvgOperationsStatistic,
};
