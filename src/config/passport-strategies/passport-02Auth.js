const GoogleStrategy = require('passport-google-oauth20').Strategy;

const AuthModel = require('../../components/Auth/model');

function initialize(passport) {
    console.log('Passport-02Auth connected!');

    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/v1/auth/google/callback',
    }, (accessToken, refreshToken, profile, cb) => {
            AuthModel.findOne({
                googleId: profile.id,
            }, async (err, user) => {
                if (err) return cb(err);

                if (!user) {
                    await AuthModel.create({
                        firstName: profile.name.givenName,
                        lastName: profile.name.familyName,
                        email: profile.emails[0].value,
                        google: {
                            googleId: profile.id,
                        },
                    });
                }
            });

            cb(null, profile);
    }));

    passport.serializeUser((user, cb) => {
        cb(null, user);
    });

    passport.deserializeUser((user, cb) => {
        cb(null, user);
    });
}

module.exports = initialize;
