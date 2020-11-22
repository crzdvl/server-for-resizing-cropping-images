const passport = require('passport');
const HistoryService = require('../History/service');
const AuthService = require('./service');
const AuthValidation = require('./validation');
const ValidationError = require('../../error/ValidationError');
const SimpleError = require('../../error/SimpleError');

/**
 * @function registerPassport
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function signup(req, res, next) {
    try {
        const { error } = AuthValidation.create(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        await AuthService.create(req.body);
        await HistoryService.create({ email: req.body.email, operation: 'created account' });

        return res.status(200).json('You signed up succesfully.');
    } catch (error) {
        if (!(error instanceof ValidationError)) {
            throw new SimpleError(500, error.message);
        }

        return next(error);
    }
}

/**
 * @function loginPassport
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function login(req, res, next) {
    try {
        return passport.authenticate('local', { email: req.body.email, password: req.body.password }, (err, user) => {
            if (err) return next(err);

            if (user) {
                return req.logIn(user, (error) => {
                    if (error) return next(error);

                    HistoryService.create({ email: req.user.email, operation: 'login' });

                    return res.status(200).json('You logined up succesfully.');
                });
            }

            if (!user) {
                return res.status(200).json('You have not logined up.');
            }
        })(req, res, next);
    } catch (error) {
        throw new SimpleError(500, error.message);
    }
}

/**
 * @function logoutPassport
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function logout(req, res, next) {
    try {
        await HistoryService.create({ email: req.user.email, operation: 'logout' });

        req.logout();

        return res.status(200).json('You logged out succesfully.');
    } catch (error) {
        throw new SimpleError(500, error.message);
    }
}

/**
 * @function googleCallback
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function googleCallback(req, res, next) {
    try {
        return passport.authenticate('google', (err, user, info) => {
            if (err) {
                return next(err);
            }

            if (!user) return res.redirect('/v1/auth/login');

            req.logIn(user, (error) => {
                if (error) return next(error);

                HistoryService.create({ email: req.body.email, operation: 'login' });

                return res.status(200).json('You logined up succesfully with Google.');
            });
        })(req, res, next);
    } catch (error) {
        throw new SimpleError(500, error.message);
    }
}

module.exports = {
    signup,
    login,
    logout,
    googleCallback,
};
