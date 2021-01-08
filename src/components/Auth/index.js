const passport = require('passport');
const HistoryService = require('../History/service');
const AuthService = require('./service');
const AuthValidation = require('./validation');
const ValidationError = require('../../error/ValidationError');
const SimpleError = require('../../error/SimpleError');

async function signup(req, res, next) {
    try {
        const { error } = AuthValidation.create(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        const hashedPassword = await AuthService.hashPassword(req.body);

        await AuthService.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
        });
        await HistoryService.createcreateRecord({ email: req.body.email, operation: 'created account' });

        return res.render('login.ejs', {
            error: 'You signed up succesfully.',
            csrfToken: req.csrfToken(),
        });
    } catch (error) {
        if (!(error instanceof ValidationError)) {
            throw new SimpleError(500, error.message);
        }

        return next(error);
    }
}

async function login(req, res, next) {
    try {
        const { error } = AuthValidation.login(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        return passport.authenticate('local', { email: req.body.email, password: req.body.password }, (err, user) => {
            if (err) return next(err);

            if (user) {
                return req.logIn(user, () => {
                    if (error) return next(err);

                    HistoryService.createRecord({ email: req.user.email, operation: 'login' });

                    return res.redirect('/v1/page/menu');
                });
            }

            if (!user) {
                return res.render('login.ejs', {
                    csrfToken: req.csrfToken(),
                    error: 'check your email and password.',
                });
            }
        })(req, res, next);
    } catch (error) {
        if (!(error instanceof ValidationError)) {
            throw new SimpleError(500, error.message);
        }

        return next(error);
    }
}

async function logout(req, res, next) {
    try {
        await HistoryService.createRecord({ email: req.user.email, operation: 'logout' });

        req.logout();

        return res.render('login.ejs', {
            csrfToken: req.csrfToken(),
            error: '',
        });
    } catch (error) {
        throw new SimpleError(500, error.message);
    }
}

async function googleCallback(req, res, next) {
    try {
        return passport.authenticate('google', (err, user, info) => {
            if (err) {
                return next(err);
            }

            if (!user) return res.redirect('/v1/page/login');

            req.logIn(user, (error) => {
                if (error) return next(error);

                HistoryService.createcreateRecord({ email: req.body.email, operation: 'login' });

                return res.redirect('/v1/page/menu');
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
