const gm = require('gm');

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

/**
 * @method getFilesize
 * @param {filename}
 * @returns {any}
 */
function getFilesize(filename) {
    return new Promise((resolve) => {
        gm(`store/changedImages/${filename}`).filesize((err, value) => {
            resolve(value.replace('Ki', ''));
        });
    });
}

module.exports = {
    resize,
    crop,
    getFilesize,
};
