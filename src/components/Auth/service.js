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

module.exports = {
    create,
};
