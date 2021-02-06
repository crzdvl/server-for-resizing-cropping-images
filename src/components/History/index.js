const HistoryService = require('./service');
const HistoryValidation = require('./validation');
const ValidationError = require('../../error/ValidationError');
const SimpleError = require('../../error/SimpleError');

async function historyCsv(req, res, next) {
    try {
        const data = await HistoryService.getAllHistory();

        await HistoryService.createRecord({ email: req.user.email, operation: 'history request' });

        const fileDate = await HistoryService.getCsvHistory(data);
        const filePath = `${__dirname}/../../store/history/${fileDate}.csv`;

        res.header('Content-Type', 'text/csv');
        res.attachment(filePath);
        return res.sendStatus(200);
    } catch (error) {
        throw new SimpleError(500, error.message);
    }
}

async function historyByDateAndEmail(req, res, next) {
    try {
        console.log('historyByDateAndEmail');
        const page = req.params.page || 1;
        let data = [];

        const time = {
            dateStart: req.query.dateStart,
            dateFinish: req.query.dateFinish,
        };
        const { email } = req.query;

        data = await HistoryService.getHistoryByDateAndEmail(page, time, email);
        await HistoryService.createRecord({ email: req.user.email, operation: 'history request' });

        return res.render('historyByDate.ejs', {
            csrfToken: req.csrfToken(),
            message: 'history of image operations with a specified time',
            name: req.user.firstName,
            history: data.history,
            current: page,
            pages: data.pages,
            input: {
                dateStart: time.dateStart,
                dateFinish: time.dateFinish,
                email,
            },
        });
    } catch (error) {
        if (!(error instanceof ValidationError)) {
            throw new SimpleError(500, error.message);
        }

        return next(error);
    }
}

async function averageStatisticOfFileSize(req, res, next) {
    try {
        const data = await HistoryService.getAverageStatisticOfFileSize();
        console.log('file');

        await HistoryService.createRecord({ email: req.user.email, operation: 'history request' });

        return res.render('history.ejs', {
            message: 'Here is average statistic of size dowloading files and params operations.',
            name: req.user.firstName,
            history: data,
            current: 1,
            pages: 1,
            pathOfUrl: '',
        });
    } catch (error) {
        throw new SimpleError(500, error.message);
    }
}

async function sumOperationsStatistic(req, res, next) {
    try {
        const page = req.params.page || 1;

        const data = await HistoryService.getSumOperationsStatistic(page);

        await HistoryService.createRecord({ email: req.user.email, operation: 'history request' });

        return res.render('history.ejs', {
            message: 'Here is sorted list of user with information about operations.',
            name: req.user.firstName,
            history: data.history,
            current: page,
            pages: data.pages,
            pathOfUrl: 'sum',
        });
    } catch (error) {
        throw new SimpleError(500, error.message);
    }
}

async function avgOperationsStatisticByDayByEmail(req, res, next) {
    try {
        const { error } = HistoryValidation.email(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        const data = await HistoryService.getAvgOperationsStatisticByDayByEmail(req.body.email);

        await HistoryService.createRecord({ email: req.user.email, operation: 'history request' });

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
    historyByDateAndEmail,
    historyCsv,
    averageStatisticOfFileSize,
    sumOperationsStatistic,
    avgOperationsStatisticByDayByEmail,
};
