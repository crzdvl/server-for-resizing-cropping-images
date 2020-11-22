/**
 * @exports
 * @extends Error
 */
class SimpleError extends Error {
    /**
    * @constructor
    * @param {string} statusCode
    * @param {string} message
    */
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

module.exports = SimpleError;
