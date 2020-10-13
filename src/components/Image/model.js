const { Schema } = require('mongoose');
const connections = require('../../config/connection');

const ImageSchema = new Schema(
    {
        image: {
            type: String,
            required: true,
        },
        operation: {
            type: String,
            required: true,
        },
        time: {
            type: Date,
            default: Date.now
        }
    },
    {
        collection: 'history',
        versionKey: false,
    },
);

module.exports = connections.model('ImageModel', ImageSchema);
