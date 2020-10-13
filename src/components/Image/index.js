const ImageService = require('./service');
const ImageValidation = require('./validation');
const ValidationError = require('../../error/ValidationError');

/**
 * @function history
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function history(req, res, next) {
    try {
        const { error } = await ImageValidation.history(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        const { dateStart, dateFinish } = req.body;

        const history = await ImageService.getHistory(dateStart, dateFinish);

        return res.status(200).json(history)
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({
                error: error.name,
                details: error.message,
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
 * @function resizeImage
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function resizeImage(req, res, next) {
    try {
        const { error } = await ImageValidation.image(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        if (!req.file)
            throw new Error('Something went wrong, ooops.. . Try again!');

        const { width, height } = req.body;
        const { filename, path } = req.file;

        await ImageService.resize(width, height, filename, path);
        await ImageService.create(filename, 'resize');

        return res.status(200).sendFile(
            process.cwd()
            + '/store/changedImages/'
            + filename
        );
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({
                error: error.name,
                details: error.message,
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
        const { error } = await ImageValidation.image(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        if (!req.file)
            throw new Error('Something went wrong, ooops.. . Try again!');

        const { width, height } = req.body;
        const { filename, path } = req.file;

        await ImageService.crop(width, height, filename, path);
        await ImageService.create(filename, 'crop');

        return res.status(200).sendFile(
            process.cwd()
            + '/store/changedImages/'
            + filename
        );
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({
                error: error.name,
                details: error.message,
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
    history
};
