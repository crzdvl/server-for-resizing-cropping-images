const bcrypt = require('bcrypt');
const AuthModel = require('./model');

function create(profile) {
    return AuthModel.create(profile);
}

function hashPassword({
    password,
}) {
    return bcrypt.hash(password, 10);
}

function comparePassword({
    password,
}, hash) {
    return bcrypt.compare(password, hash);
}

module.exports = {
    create,
    hashPassword,
    comparePassword,
};
