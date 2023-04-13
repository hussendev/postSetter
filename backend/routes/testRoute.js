const express = require('express')
const router = express.Router()

const {getPosts,creatPost,updatePost,deletePost}=require('../controller/testController')





router.route('/api/test').get(getPosts).post(creatPost)
router.route('/api/test/:id').put(updatePost).delete(deletePost)



module.exports=router 