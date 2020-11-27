const bcrypt = require('bcrypt');
const AuthModel = require('./model');

/**
 * @exports
 * @method create
 * @param {object} profile
 * @summary create a new user
 * @returns {Promise<UserModel>}
 */
function create(profile) {
    return AuthModel.create(profile);
}

/**
 * @exports
 * @method hashPassword
 * @param {password}
 * @summary hash password
 * @returns {Promise<ResultSetHeader>}
 */
function hashPassword({
    password,
}) {
    return bcrypt.hash(password, 10);
}

/**
 * @exports
 * @method comparePassword
 * @param {password}
 * @summary compare password
 * @returns {Promise<ResultSetHeader>}
 */
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
