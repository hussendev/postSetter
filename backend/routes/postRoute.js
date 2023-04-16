const express = require('express')
const router = express.Router()

const {getPosts,creatPost,updatePost,deletePost}=require('../controller/postController')
const {protect}=require('../middleware/authMiddleware')




router.route('/api/post').get(protect,getPosts).post(protect,creatPost)
router.route('/api/post/:id').put(protect,updatePost).delete(protect,deletePost)



module.exports=router 