const ImageService = require('./service');
const ImageValidation = require('./validation');
const ImageError = require('../../error/ImageError');
const ValidationError = require('../../error/ValidationError');
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

        if (!req.file) throw new Error('Something went wrong, ooops.. . Try again!');

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
        if (error instanceof ValidationError) {
            return res.status(422).json({
                error: error.name,
                details: error.message,
            });
        }

        if (error instanceof ImageError) {
            return res.status(400).json({
                error: error.name,
                details: req.err || 'Unable to process file.',
            });
        }

        res.status(500).json({
            message: error.name,
            details: error.message,
        });

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
        if (error instanceof ValidationError) {
            return res.status(422).json({
                error: error.name,
                details: error.message,
            });
        }

        if (error instanceof ImageError) {
            return res.status(400).json({
                error: error.name,
                details: req.err || 'Unable to process file.',
            });
        }

        res.status(500).json({
            message: error.name,
            details: error.message,
        });

        return next(error);
    }
}

module.exports = {
    resizeImage,
    cropImage,
};
