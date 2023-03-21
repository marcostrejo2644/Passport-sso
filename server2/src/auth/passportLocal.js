const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user')

require('dotenv').config()

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      // Match Email's User
      const user = await User.findOne({ email: email });

      if (!user) {
        return done(null, false, { message: "Not User found." });
      }

      // Match Password's User
      const isMatch = await user.comparePassword(password);
      if (!isMatch)
        return done(null, false, { message: "Incorrect Password." });

      return done(null, user);
    })
)

passport.serializeUser((user, cb) => {
  cb(null, user)
})

passport.deserializeUser(async (user, cb) => {
  try {
    // console.log('user deserializeUser', user)
    const userFromMongo = await User.findOne({ email: user?.email })
    cb(null, userFromMongo)
  } catch (error) {
    cb(error, null)
  }
})

