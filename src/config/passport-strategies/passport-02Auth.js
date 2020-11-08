const GoogleStrategy = require('passport-google-oauth20').Strategy;

const AuthModel = require('../../components/Auth/model');
const AuthService = require('../../components/Auth/service');

function initialize(passport) {
    console.log('Passport-02Auth connected!');

    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/auth/google/callback',
        passReqToCallback: true,
    }, (accessToken, refreshToken, profile, done) => {
            AuthModel.findOne({
                googleId: profile.id,
            }, async (err, user) => {
                if (err) return done(err);

                if (!user) {
                    await AuthService.create({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        googleId: profile.id,
                    });

                    return done(err, user);
                }
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
