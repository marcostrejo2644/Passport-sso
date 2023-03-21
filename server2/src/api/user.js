const express = require('express')
const { isUserAuthenticate } = require('../middlewares/auth')

const router = express.Router()

router.get('/auth/user', isUserAuthenticate, (req, res) => {
  // console.log('User from auth/user: ', req.user)
  res.json(req.user)
})

module.exports = router
