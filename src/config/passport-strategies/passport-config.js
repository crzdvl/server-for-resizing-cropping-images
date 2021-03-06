const LocalStrategy = require('passport-local').Strategy;
const AuthModel = require('../../components/Auth/model');

const AuthService = require('../../components/Auth/service');

function initialize(passport) {
    console.log('Passport-local connected!');

    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    }, (email, password, done) => {
            AuthModel.findOne({ email }, (err, user) => {
                if (err) return done(err);

                if (!user) {
                    return done(null, false, { message: 'Incorrect user.' });
                }

                const comparePassword = AuthService.comparePassword({ password }, user.password);

                if (!comparePassword) {
                    return done(null, false, { message: 'Incorrect password.' });
                }

                return done(null, user);
            });
    }));

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });
}

module.exports = initialize;
