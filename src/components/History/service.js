const createCsvWriter = require('csv-writer').createObjectCsvWriter;

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
 * @method getAllHistory
 * @param {}
 * @returns {any}
 */
function getAllHistory() {
    return HistoryModel.find();
}

/**
 * @exports
 * @method create
 * @param { data }
 * @returns {Promise<ImageModel>}
 */
function create(data) {
    return HistoryModel.create(data);
}

/**
 * @exports
 * @method generateCsv
 * @param { data }
 * @returns {Promise<ImageModel>}
 */
function generateCsv(data) {
    const fileDate = Date.now();
    const csvWriter = createCsvWriter({
        path: `./store/history/${fileDate}.csv`,
        header: [
            { id: 'email', title: 'Email' },
            { id: 'operation', title: 'Operation' },
            { id: 'image', title: 'Image' },
            { id: 'time', title: 'Time' },
        ],
    });

    csvWriter.writeRecords(data);

    return fileDate;
}

/**
 * @method getAverageStatistic
 * @param {}
 * @returns {any}
 */
function getAverageStatistic() {
    return HistoryModel.aggregate(
        [
            {
                $facet: {
                    CropTotal: [
                        { $match: { operation: 'crop' } },
                        { $count: 'Croped' },
                    ],
                    ResizeTotal: [
                        { $match: { operation: 'resize' } },
                        { $count: 'Resized' },
                    ],
                    SizeAvg: [
                        {
                            $match: {
                                $or: [{ operation: 'resize' }, { operation: 'crop' }],
                            },
                        },
                        {
                            $group: {
                                _id: null,
                                filesizeAvg: {
                                    $avg: '$filesize',
                                },
                            },

                        },
                    ],
                },
            },
            {
                $project: {
                    CropTotal: { $arrayElemAt: ['$CropTotal.Croped', 0] },
                    ResizeTotal: { $arrayElemAt: ['$ResizeTotal.Resized', 0] },
                    SizeAvg: { $arrayElemAt: ['$SizeAvg.filesizeAvg', 0] },
                },
            },
        ],
    );
}

/**
 * @method getSumOperationsStatistic
 * @param {}
 * @returns {any}
 */
function getSumOperationsStatistic() {
    return HistoryModel.aggregate(
        [
            {
                $project: {
                    email: 1,
                    crop: {
                        $cond: {
                            if: {
                                $eq: ['$operation', 'crop'],
                            },
                            then: 1,
                            else: 0,
                        },
                    },
                    resize: {
                        $cond: {
                                if: {
                                    $eq: ['$operation', 'resize'],
                                },
                                then: 1,
                                else: 0,
                        },
                    },
                    history: {
                        $cond: {
                            if: {
                                $eq: ['$operation', 'history request'],
                            },
                            then: 1,
                            else: 0,
                        },
                    },
                },
            },
            {
                $group: {
                    _id: '$email',
                    cropSum: { $sum: '$crop' },
                    resizeSum: { $sum: '$resize' },
                    historySum: { $sum: '$history' },
                },
            },
        ],
    );
}

/**
 * @method getAvgOperationsStatistic
 * @param {}
 * @returns {any}
 */
function getAvgOperationsStatistic(email) {
    return HistoryModel.aggregate(
        [
            {
                $match: { email },
            },
            {
                $project: {
                    time: 1,
                    email: 1,
                    crop: {
                        $cond: {
                            if: {
                                $eq: ['$operation', 'crop'],
                            },
                            then: 1,
                            else: 0,
                        },
                    },
                    resize: {
                        $cond: {
                            if: {
                                $eq: ['$operation', 'resize'],
                            },
                            then: 1,
                            else: 0,
                        },
                    },
                },
            },
            {
                $group: {
                    _id: '$time',
                    cropSum: { $sum: '$crop' },
                    resizeSum: { $sum: '$resize' },
                },
            },
        ],
    );
}

module.exports = {
    getHistory,
    create,
    generateCsv,
    getAllHistory,
    getAverageStatistic,
    getSumOperationsStatistic,
    getAvgOperationsStatistic,
};
