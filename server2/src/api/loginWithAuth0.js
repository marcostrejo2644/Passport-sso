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

router.get('/loginGoogle', passport.authenticate('google',{
  scope: ['email', 'profile'],
  successRedirect: 'http://localhost:3000/login/sucess',
  failureRedirect: 'http://localhost:3000/login/error'
}));

router.get('/loginGoogle/callback', async(req, res) => {
  /* console.log('req', req) */
  console.log('User?', req.user)
})
module.exports = router
