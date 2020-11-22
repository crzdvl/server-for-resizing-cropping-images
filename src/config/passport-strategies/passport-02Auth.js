const GoogleStrategy = require('passport-google-oauth20').Strategy;

const AuthModel = require('../../components/Auth/model');

function initialize(passport) {
    console.log('Passport-02Auth connected!');

    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/v1/auth/google/callback',
    }, (accessToken, refreshToken, profile, done) => {
            AuthModel.findOne({
                google: {
                    googleId: profile.id,
                },
            }, async (err, user) => {
                if (err) return done(err);

                if (!user) {
                    await AuthModel.create({
                        firstName: profile.name.givenName,
                        lastName: profile.name.familyName,
                        email: profile.emails[0].value,
                        google: {
                            googleId: profile.id,
                        },
                    }, (error, userC) => done(error, userC));
                }

                console.log(user, err);
                done(err, user);
            });
    }));

    passport.serializeUser((user, done) => {
        console.log('serialize');
        done(null, user.id);
    });

    passport.deserializeUser((user, done) => {
        console.log('deserialize');
        done(null, user);
    });
}

module.exports = initialize;
