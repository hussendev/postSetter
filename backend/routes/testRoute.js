const express = require('express')
const router = express.Router()

const {getPosts,creatPost,updatePost,deletePost}=require('../controller/testController')





router.route('/api/post').get(getPosts).post(creatPost)
router.route('/api/post/:id').put(updatePost).delete(deletePost)



module.exports=router 