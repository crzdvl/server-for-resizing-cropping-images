const HistoryService = require('./service');
const HistoryValidation = require('./validation');
const ValidationError = require('../../error/ValidationError');

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

        return res.status(200).json(data);
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({
                error: error.name,
                details: error.message,
            });
        }

        res.status(500).json({
            message: error.name,
            details: error.message,
        });

        return next(error);
    }
}

module.exports = {
    history,
};
