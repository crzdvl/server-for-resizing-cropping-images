const _ = require('lodash');

const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const HistoryModel = require('./model');

function getAllHistory() {
    return HistoryModel.find().lean();
}

function createRecord(data) {
    return HistoryModel.create(data);
}

function getCsvHistory(data) {
    const fileDate = Date.now();
    const csvWriter = createCsvWriter({
        path: `./src/public/store/history/${fileDate}.csv`,
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

async function getHistoryByDateAndEmail(page, time, email) {
    const perPage = 25;
    let filter = {};
    if (!_.isEmpty(time.dateStart) && !_.isEmpty(time.dateFinish)) {
        filter = {
            time: {
                $gte: new Date(new Date(time.dateStart).setHours(0, 0, 0)),
                $lt: new Date(new Date(time.dateFinish).setHours(23, 59, 59)),
            },
        };
    }
    if (!_.isEmpty(email)) {
        filter = {
            email,
        };
    }

    const history = await HistoryModel
        .find(filter)
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .lean();

    const count = await HistoryModel.countDocuments(filter);
    const pages = Math.ceil(count / perPage);

    return {
        history,
        pages,
    };
}

function getAverageStatisticOfFileSize() {
    return HistoryModel.aggregate(
        [
            {
                $project: {
                    time: 0,
                    image: 0,
                    email: 0,
                    _id: 0,
                },
            },
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

function getAvgOperationsStatisticByDayByEmail(email) {
    return HistoryModel.aggregate(
        [
            {
                $project: {
                    image: 0,
                    filesize: 0,
                },
            },
            {
                $match: { email },
            },
            {
                $project: {
                    time: 1,
                    operation: 1,
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
    createRecord,
    getCsvHistory,
    getAllHistory,
    getAverageStatisticOfFileSize,
    getSumOperationsStatistic,
    getAvgOperationsStatisticByDayByEmail,
    getHistoryByDateAndEmail,
};
