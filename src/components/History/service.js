const HistoryModel = require('./model');

/**
 * @method getHistory
 * @param {dateStart, dateFinish}
 * @returns {any}
 */
function getHistory(dateStart, dateFinish) {
    return HistoryModel.find({
        time:
        {
            $gte: new Date(new Date(dateStart).setHours(0, 0, 0)),
            $lt: new Date(new Date(dateFinish).setHours(23, 59, 59)),
        },
    });
}

/**
 * @exports
 * @method create
 * @param {image, operation}
 * @returns {Promise<ImageModel>}
 */
function create(data) {
    return HistoryModel.create(data);
}

module.exports = {
    getHistory,
    create,
};
