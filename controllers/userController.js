const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validateToken = require("../middleware/validateTokenHandler");

const registerUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body;
    console.log("register  aaaaa");
    
    if(!username || !email || !password){
        console.log("register  bbbbb");
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const userAvailable = await User.findOne({email});
    console.log("userAvailable", userAvailable);
    

    if(userAvailable){
        res.status(400);
        throw new Error("User already registered");
    }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("hashedPassword", hashedPassword);

    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });
    console.log(`user created ${user}`);
    if(user){
        res.status(201).json({_id: user.id, email: user.email});
    }else{
        res.status(400);
        throw new Error("User data is not valid");
    }
    
    res.json({ message: "register the user" });
  });
  
  const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign(
            {
                "username": user.username,
                "email": user.email,
                "id": user.id
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '15m'}
        );
    res.status(200).json({accessToken})
    }else{
        res.status(401);
        throw new Error("email or password is not valid");
    }
  });
  
  const currentUser = asyncHandler(async (req, res) => {
    
    
    res.json({user:req.user});
  });

  module.exports = {
    registerUser,
    loginUser,
    currentUser,
  }