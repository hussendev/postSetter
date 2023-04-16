const jwt=require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.js');
const asyncHandler = require('express-async-handler');

const registerUser =asyncHandler(
    async (req, res) => {
        const { name, email, password } = req.body;
        if(!name || !email || !password){
            res.status(400).json(
                {
                    "message": "please enter all fields",
                    "status": "failed"
                })
        }

        //check for existing user
        const userExists= await User.findOne({email:email})
        if(userExists){
            res.status(400).json(
                {
                    "message": "user already exists",
                    "status": "failed"
                })
        }
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        if(user){
            res.status(201).json(
                {
                    "message": "user created successfully",
                    "status": "success",
                    "data": user,
                    token: generateToken(user._id)
                })
        }else{
            res.status(400).json(
                {
                    "message": "Invalid user data",
                    "status": "failed"
                })
        }

        //another way to create user
       
        // const { name, email, password } = req.body;
        // try {
        //     const user = await User.create({
        //         name,
        //         email,
        //         password,
        //     });
        //     res.status(201).json({
        //         success: true,
        //         message: "User created successfully",
        //         data: user,
        //     });
        // } catch (error) {
        //     res.status(500).json({
        //         success: false,
        //         message: error.message,
        //     });
        // }
    }
)

const loginUser = asyncHandler(async (req, res) => {
        const { email, password } = req.body;
       
        const user= await User.findOne({
          email
        })
        if (user &&(await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                // isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        }else{
            res.status(401).json(
                {
                    "message": "Invalid email or password",
                    "status": "failed"
                })
        }
   })


const getUser = asyncHandler(async (req, res) => {
    const {_id,name,email}=await User.findById(req.user._id)


    
    res.status(200).json(
        {
             id:_id,
                name:name,
                email:email,
        }
    )})

    // Generate JWT token

    const generateToken = (id) => {
        return jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: '30d',
        });
    };


    

module.exports = { registerUser, loginUser, getUser }