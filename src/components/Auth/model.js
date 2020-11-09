const { Schema } = require('mongoose');
const connections = require('../../config/connection');

const AuthSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
        },
        password: {
            type: String,
        },
        google: {
            googleId: {
                type: String,
                default: 0,
            },
        },
    },
    {
        collection: 'users',
        versionKey: false,
    },
);

module.exports = connections.model('AuthModel', AuthSchema);
