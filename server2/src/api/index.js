const express = require('express')
const userRoute = require('./user')
const loginWithAuth0 = require('./loginWithAuth0')

const router = express.Router()

router.use('/user', userRoute)
router.use('/auth', loginWithAuth0)

module.exports = router

