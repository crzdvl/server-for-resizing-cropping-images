const { Schema } = require('mongoose');
const connections = require('../../config/connection');

const HistorySchema = new Schema(
    {
        email: {
            type: String,
        },
        image: {
            type: String,
        },
        operation: {
            type: String,
            required: true,
        },
        filesize: {
            type: Number,
        },
        time: {
            type: Date,
            default: Date.now,
        },
    },
    {
        collection: 'history',
        versionKey: false,
    },
);

module.exports = connections.model('HistoryModel', HistorySchema);
