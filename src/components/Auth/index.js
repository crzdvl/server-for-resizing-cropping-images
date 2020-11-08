const passport = require('passport');

const AuthService = require('./service');
const AuthValidation = require('./validation');
const ValidationError = require('../../error/ValidationError');

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

        return res.status(200).json('You signed up succesfully.');
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({
                message: error.name,
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
 * @function loginPassport
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function login(req, res, next) {
    try {
        return passport.authenticate('local', { name: req.body.email, password: req.body.password }, (err, user) => {
            if (err) return next(err);
            if (user) {
                return req.logIn(user, (error) => {
                    if (error) return next(error);
                    return res.status(200).json('You logined up succesfully.');
                });
            }
            if (!user) {
                return res.status(200).json('You have not logined up.');
            }
        })(req, res, next);
    } catch (error) {
        res.status(500).json({
            message: error.name,
            details: error.message,
        });

        return next(error);
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
        req.logout();
        return res.status(200).json('You logged out succesfully.');
    } catch (error) {
        res.status(500).json({
            message: error.name,
            details: error.message,
        });

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
async function loginGoogle(req, res, next) {
    try {
        return passport.authenticate('google', { scope: ['email', 'profile'] }, (err, user) => {
            if (err) return next(err);

            if (user) {
                return res.status(200).json('You logged up succesfully with Google.');
            }
            if (!user) {
                return res.status(200).json('You have not logged up with Google.');
            }
        })(req, res, next);
    } catch (error) {
        res.status(500).json({
            message: error.name,
            details: error.message,
        });

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
async function googleCallback(req, res, next) {
    try {
        return passport.authenticate('google', {
            successRedirect: '/auth/good',
            failureRedirect: '/auth/bad',
        });
    } catch (error) {
        res.status(500).json({
            message: error.name,
            details: error.message,
        });

        return next(error);
    }
}

async function good(req, res, next) {
    try {
        return res.status(200).json('good');
    } catch (error) {
        res.status(500).json({
            message: error.name,
            details: error.message,
        });

        return next(error);
    }
}

async function bad(req, res, next) {
    try {
        return res.status(200).json('bad');
    } catch (error) {
        res.status(500).json({
            message: error.name,
            details: error.message,
        });

        return next(error);
    }
}

module.exports = {
    signup,
    login,
    logout,
    loginGoogle,
    googleCallback,
    good,
    bad,
};
