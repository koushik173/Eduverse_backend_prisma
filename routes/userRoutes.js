const express = require('express')
const router  = express.Router()

const  {signup, login, logout} = require('../Controllers/userControllers')
const { validateSignUp, validateLogin } = require('../middleware/validateInput')

router.route('/signup').post(validateSignUp, signup)
router.route('/login').post(validateLogin, login)
router.route('/logout').get(logout)

module.exports = router 