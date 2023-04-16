const express = require('express')
const router = express.Router()
const { registerUser, loginUser,getUser } = require('../controller/userController.js')
const { protect } = require('../middleware/authMiddleware.js')

router.post('/api/registerUser',registerUser )
router.post('/api/login',loginUser )
router.get('/api/getUser',protect,getUser )

module.exports = router