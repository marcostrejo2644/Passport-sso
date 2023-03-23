const passport = require('passport')
const googleStrategy = require('passport-google-oidc').Strategy;
const User = require('../models/user')

require('dotenv').config()

passport.use(new googleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: 'http://localhost:8000/api/v1/auth/loginGoogle'
  },
  function(issuer, profile, cb) {
    console.log('issuer', issuer)
    console.log('profile', profile)
    cb(null, profile)
  }
));

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
