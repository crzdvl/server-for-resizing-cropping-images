const gm = require('gm');
const ImageModel = require('./model');

/**
 * @method getHistory
 * @param {dateStart, dateFinish}
 * @returns {any}
 */
function getHistory(dateStart, dateFinish) {
    return ImageModel.find({
        time:
        {
            $gte: new Date(new Date(dateStart).setHours(0, 0, 0)),
            $lt: new Date(new Date(dateFinish).setHours(23, 59, 59)),
        },
    });
}

/**
 * @exports
 * @method create
 * @param {image, operation}
 * @returns {Promise<ImageModel>}
 */
function create(image, operation) {
    return ImageModel.create({ image, operation });
}

/**
 * @method resize
 * @param {width, height, filename}
 * @returns {any}
 */
function resize(width, height, filename, path) {
    return new Promise((resolve, reject) => {
        gm(path)
            .resize(width, height)
            .write(`store/changedImages/${filename}`, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
    });
}

/**
 * @method resize
 * @param {width, height, filename}
 * @returns {any}
 */
function crop(width, height, filename, path) {
    return new Promise((resolve, reject) => {
        gm(path)
            .gravity('Center')
            .crop(width, height)
            .write(`store/changedImages/${filename}`, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
    });
}

module.exports = {
    getHistory,
    create,
    resize,
    crop,
};
