const asyncHandler = require('express-async-handler')
const getPosts = asyncHandler(

    (req,res) =>{
        res.status(200).json(
        {
            "message": "get posts",
            "status": "success"
        }
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
        
        res.status(201).json(
        {
            "message": "Created successfully",
            "status": "success"
        }
    )
    }
)
const updatePost = asyncHandler(
    async (req,res) =>{
        res.status(200).json(
        {
            "message": `${req.params.id} Updated successfully`,
            "status": "success"
        }
    )
    }
)

const deletePost = asyncHandler(
    async (req,res) =>{
        res.status(200).json(
        {
            "message": `${req.params.id} Deleted successfully` ,
            "status": "success"
        }
    )
    }
)



module.exports={getPosts,creatPost,updatePost,deletePost}