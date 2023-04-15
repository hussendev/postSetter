const asyncHandler = require('express-async-handler')
const Post = require('../models/post.js')
const getPosts = asyncHandler(
    async  (req,res) =>{
        const posts = await Post.find({}).sort()
        res.status(200).json(
            posts
    )
    }
)



const creatPost = asyncHandler(
    async (req,res) =>{
      
        if (req.body.text == null || req.body.text == "") {
            res.status(400).json(
                {
                    "message": "this faild must be not null",
                    "status": "error"
                })
        }
        const post = await Post.create({
                text: req.body.text,
            })
        
        res.status(200).json(
            post
    )
    }
)
const updatePost = asyncHandler(
    async (req,res) =>{

        const post=await Post.findById(req.params.id)
        if(!post){
            res.status(400).json(
                {
                    "message": "this post not found",
                    "status": "error"
                })

        }


        const postUpdated=await Post.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new:true,
                runValidators:true
            }

        )
        res.status(200).json(
        {
            "message": `${req.params.id} Updated successfully`,
            "status": "success",
            "data": postUpdated
        }
    )
    }
)

const deletePost = asyncHandler(
    async (req,res) =>{

        const post=await Post.findById(req.params.id)
        if(!post){
            res.status(400).json(
                {
                    "message": "this post not found",
                    "status": "error"
                })
            }
            const postDeleted=await Post.findByIdAndDelete(req.params.id)
        res.status(200).json(
        {
            "message": `${req.params.id} Deleted successfully` ,
            "status": "success",
            "data": postDeleted
        }
    )
    }
)



module.exports={getPosts,creatPost,updatePost,deletePost}