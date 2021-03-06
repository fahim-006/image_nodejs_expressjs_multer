const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('../models/user');
const _ = require('lodash');

const strategy = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/auth/google/redirect"
}, async (accessToken, refreshToken, profile, cb) => {
    //console.log("Profile: ", profile);
    let user = await User.findOne({ googleId: profile.id, email: profile._json.email });
    if (user) {
        //console.log("User exists:", user);
        const token = user.generateJWT();
        const response = {
            user: _.pick(user, ["email", "_id"]),
            token: token
        }
        cb(null, response);
    } else {
        user = new User({ googleId: profile.id, email: profile._json.email });
        await user.save();
        const token = user.generateJWT();
        const response = {
            user: _.pick(user, ["email", "_id"]),
            token: token
        }
        cb(null, response);
        //console.log("New User:", user);
    }
});

passport.use(strategy);

// session based and token based
// https://sherryhsu.medium.com/session-vs-token-based-authentication-11a6c5ac45e4#:~:text=Many%20web%20applications%20use%20JSON,instead%20of%20sessions%20for%20authentication.&text=The%20biggest%20difference%20here%20is,on%20the%20client%20side%20instead.