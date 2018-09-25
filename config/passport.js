const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('./keys');

//empty object for options
const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      //get user being sent in token
      //give us promise - get user
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            //user has been found
            //return done function - error which is null and user
            return done(null, user);
          }
          //if user isnt found
          //no error and false for no user
          return done(null, false);
        })
        //catch error if anything does go wrong
        .catch(err => console.log(err));
    })
  );
};
