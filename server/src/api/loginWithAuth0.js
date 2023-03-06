const express = require('express')
const passport = require('passport')
const querystring = require('querystring')
const { isUserAuthenticate } = require('../middlewares/auth')

const router = express.Router()

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Everything is ok!' })
})

router.get(
  '/login',
  passport.authenticate('auth0', {
    scope: 'openid email profile',
    failureMessage: 'Cannot login, try again',
    failureRedirect: 'http://localhost:3000/login/error',
    successRedirect: 'http://localhost:3000/login/success',
    successReturnToOrRedirect: 'http://localhost:3000/login/success',
  })
)

router.get(
  '/callback',
  passport.authenticate('auth0', {
    scope: 'openid email profile',
    failureMessage: 'Cannot login, try again',
    failureRedirect: 'http://localhost:3000/login/error',
    successRedirect: 'http://localhost:3000/login/success',
    successReturnToOrRedirect: 'http://localhost:3000/login/success',
  }),
  async (req, res) => {
    try {
      console.log('USER: ', req.user)
      res.status(204).json({ message: 'Login succesfully' })
    } catch (error) {
      console.log('error Callback', error)
    }
  }
)

router.get('/logout', (req, res) => {
  req.logOut(() => {
    let returnTo = req.protocol + '://' + req.hostname
    const port = req.connection.localPort

    if (port !== undefined && port !== 80 && port !== 443) {
      returnTo =
        process.env.NODE_ENV === 'production'
          ? `${returnTo}/`
          : `${returnTo}:${port}/`
    }

    const logoutURL = new URL(`https://${process.env.AUTH0_DOMAIN}/v2/logout`)

    const searchString = querystring.stringify({
      client_id: process.env.AUTH0_CLIENT_ID,
      returnTo: 'http://localhost:3000',
    })
    logoutURL.search = searchString

    res.redirect(logoutURL)
  })
})

router.get('/testLogin', isUserAuthenticate, (req,res) => {
  console.log('req user from testLogin', req.user)
  res.status(200).json({message: "you are authenticate"})
})

router.post('/isAuth', isUserAuthenticate, (req,res) => {
  console.log('req user from testLogin', req.user)
  res.status(200).json({message: "you are authenticate"})
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
