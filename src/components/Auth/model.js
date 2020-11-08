const { Schema } = require('mongoose');
const connections = require('../../config/connection');

const AuthSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
        },
        googleId: {
            type: String,
            default: 0,
        },
    },
    {
        collection: 'users',
        versionKey: false,
    },
);

module.exports = connections.model('AuthModel', AuthSchema);
