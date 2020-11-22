const ImageService = require('./service');
const ImageValidation = require('./validation');
const ImageError = require('../../error/ImageError');
const ValidationError = require('../../error/ValidationError');
const SimpleError = require('../../error/SimpleError');
const HistoryService = require('../History/service');

/**
 * @function resizeImage
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function resizeImage(req, res, next) {
    try {
        if (req.err || !req.file) {
            throw new ImageError(req.err);
        }

        const { error } = await ImageValidation.image(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        if (!req.file) throw new ImageError('Something went wrong, ooops.. . Try again!');

        const { width, height } = req.body;
        const { filename, path } = req.file;

        await ImageService.resize(width, height, filename, path);
        const imageFileSize = await ImageService.getFilesize(filename);

        await HistoryService.create({
            email: req.user.email,
            image: filename,
            operation: 'resize',
            filesize: imageFileSize,
        });

        return res.status(200).sendFile(
            `${process.cwd()
             }/store/changedImages/${
             filename}`,
        );
    } catch (error) {
        if (!(error instanceof ValidationError)) {
            throw new SimpleError(500, error.message);
        } else if (!(error instanceof ImageError)) {
            throw new SimpleError(500, error.message);
        }

        return next(error);
    }
}

/**
 * @function cropImage
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function cropImage(req, res, next) {
    try {
        if (req.err) {
            throw new ImageError(req.err);
        }

        if (!req.file) throw new Error('Something went wrong, ooops.. . Try again!');

        const { error } = await ImageValidation.image(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        const { width, height } = req.body;
        const { filename, path } = req.file;

        await ImageService.crop(width, height, filename, path);

        const imageFileSize = await ImageService.getFilesize(filename);

        await HistoryService.create({
            email: req.user.email,
            image: filename,
            operation: 'crop',
            filesize: imageFileSize,
        });

        return res.status(200).sendFile(
            `${process.cwd()
            }/store/changedImages/${
            filename}`,
        );
    } catch (error) {
        if (!(error instanceof ValidationError)) {
            throw new SimpleError(500, error.message);
        } else if (!(error instanceof ImageError)) {
            throw new SimpleError(500, error.message);
        }

        return next(error);
    }
}

module.exports = {
    resizeImage,
    cropImage,
};
