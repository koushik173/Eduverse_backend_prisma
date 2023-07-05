const express = require('express')
const router  = express.Router()

const isLoggedIn = require('../middleware/isLoggedIn')

const { updatePost, createPost, deletePost, getPost } = require('../Controllers/postControllers')
const { userLimiter, routeLimiter } = require('../middleware/limiterMid')

router.route('/post/create').post(isLoggedIn,userLimiter,routeLimiter , createPost)
router.route('/post/update/:id').put(isLoggedIn,userLimiter,routeLimiter, updatePost)
router.route('/post/delete/:id').delete(isLoggedIn,userLimiter,routeLimiter, deletePost)
router.route('/post/get').get(routeLimiter, getPost)

module.exports = router 
