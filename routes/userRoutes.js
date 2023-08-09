const express = require('express')
const router  = express.Router()

const  {signup, login, logout, userVerify} = require('../Controllers/userControllers')
const { validateSignUp, validateLogin } = require('../middleware/validateInput')

router.route('/signup').post(validateSignUp,signup)
router.route('/login').post(validateLogin, login)
router.route('/logout').get(logout)
router.route('/:id/verify/:token/').get(userVerify)

module.exports = router