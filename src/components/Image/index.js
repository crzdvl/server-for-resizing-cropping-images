const ImageService = require('./service');
const ImageValidation = require('./validation');
const ImageError = require('../../error/ImageError');
const ValidationError = require('../../error/ValidationError');
const SimpleError = require('../../error/SimpleError');
const HistoryService = require('../History/service');

/**
 * @function editImage
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function editImage(req, res, next) {
    try {
        if (req.err || !req.file) {
            throw new ImageError(req.err);
        }

        const { error } = await ImageValidation.image(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        const { width, height } = req.body;
        const { filename, path } = req.file;

        if (req.body.radios === 'crop') {
            await ImageService.crop(width, height, filename, path);

            const imageFileSize = await ImageService.getFilesize(filename);

            await HistoryService.create({
                email: req.user.email,
                image: filename,
                operation: 'crop',
                filesize: imageFileSize,
            });
        }

        if (req.body.radios === 'resize') {
            await ImageService.resize(width, height, filename, path);
            const imageFileSize = await ImageService.getFilesize(filename);

            await HistoryService.create({
                email: req.user.email,
                image: filename,
                operation: 'resize',
                filesize: imageFileSize,
            });
        }

        return res.render('editor.ejs', {
            error: '',
            name: req.user.firstName,
            csrfToken: req.csrfToken(),
            image: `/store/changedImages/${filename}`,
        });
    } catch (error) {
        if (!(error instanceof ValidationError) && !(error instanceof ImageError)) {
            throw new SimpleError(500, error.message);
        }

        return next(error);
    }
}

module.exports = {
    editImage,
};
