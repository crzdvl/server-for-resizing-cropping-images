/**
 * @exports
 * @extends Error
 */
class ImageError extends Error {
    /**
     * @constructor
     * @param {object} message
     */
    constructor(message) {
        super();
        this.statusCode = 500;
        this.message = message;
        this.name = 'E_MISSING_OR_INVALID_TYPE_OF_IMAGE';
    }
}

module.exports = ImageError;
