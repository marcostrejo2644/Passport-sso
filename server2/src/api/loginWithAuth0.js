const express = require('express')
const passport = require('passport')
const querystring = require('querystring')
const { isUserAuthenticate } = require('../middlewares/auth')

const User = require('../models/user')

const router = express.Router()

router.get('/', (req, res) => {
  console.log('HOST: ', req.headers.origin)
  res.status(200).json({ message: 'Everything is ok!' })
})

router.get('/home', (req, res) => {
  res.render('home')
})

router.get(
  '/signup',
  async (req, res) => {
    res.render('signupForm')
  }
)

router.post('/signup', async (req, res) => {
  try {
    const { username, email, password, confirm_password } = req.body
    if (password !== confirm_password) res.status(500)
    const user = {
      username,
      email,
      password,
      profilePicture: '',
      description: '',
      gamesLibrary: [],
      gamesCreated: [],
      isDeveloper: false,
      customURL: '',
      thirdParty: 'passport-local',
      updateDate: new Date(),
    }
    const emailIsAlreadyInUse = await User.findOne({email: user.email})
    if(emailIsAlreadyInUse) return res.status(500).json({ message: 'Email is already in use' })
    const newUser = new User(user)
    await newUser.save()
    res.redirect('/api/v1/auth/login')
  } catch (error) {
    console.log('POST SIGNUP error:', error)
  }
})

router.get(
  '/login',
  async (req, res) => {
    res.render('loginForm')
  }
)

router.post('/login', passport.authenticate('local', {
  successRedirect: 'http://localhost:3000/login/sucess',
  failureRedirect: '/api/v1/auth/login'
}), async (req, res) => {
   try {
     res.status(204).json({ message: 'Login succesfully', user: req.user })
   } catch (error) {
     console.log('error Callback', error)
   }
 })

router.get('/logout', (req, res) => {
  req.logOut(() => {
    const { returnTo } = req.query
    const logoutURL = new URL(`https://${process.env.AUTH0_DOMAIN}/v2/logout`)
    const searchString = querystring.stringify({
      client_id: process.env.AUTH0_CLIENT_ID,
      returnTo
    })
    logoutURL.search = searchString

    res.redirect(logoutURL)
  })
})

router.get('/isAuthAndGetUser', isUserAuthenticate, (req, res) => {
  res.status(200).json({ message: "you are authenticate", user: req.user })
})

router.post('/isAuth', isUserAuthenticate, (req, res) => {
  res.status(200).json({ message: "you are authenticate" })
})

// From web app example
// router.get('/callback', (req, res, next) => {
//   console.log('Callback')
//   passport.authenticate('auth0', (err, user, info) => {
//     if (err) {
//       console.log('exist an error')
//       return next(err)
//     }
//     if (!user) {
//       return res.redirect('/login')
//     }
//     req.logIn(user, (err) => {
//       if (err) {
//         return next(err)
//       }
//       const returnTo = req.session.returnTo
//       delete req.session.returnTo
//       res.redirect(returnTo || '/')
//     })
//   })
// })

module.exports = router
