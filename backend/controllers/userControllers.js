import asyncHandler from "express-async-handler";
import User from "../models/userModel.js"
import generateToken from "../utils/generateToken.js";


export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, profilePic } = req.body;

    if(!name || !email || !password) {
        res.status(400);
        throw new Error("Please fill all the required fields")
    }

    const existingUser = await User.findOne({ email });
    if(existingUser) {
        res.status(400);
        throw new Error("User already exists")
    }

    const user = await User.create({ name, email, password, profilePic })

    if(user) {
        res.status(201).json({
            _id: user?._id,
            name: user?.name,
            email: user?.email,
            profilePic: user?.profilePic,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error("Failed to create the user");
    }
    
});

export const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.status(201).json({
        _id: user?._id,
        name: user?.name,
        email: user?.email,
        profilePic: user?.profilePic,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid email or password");
    }
});

export const allUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.search ? {
        $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
        ]
    } : {};

    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });

    return res.send(users)
});

export const editUser = asyncHandler(async (req, res) => {
    const {userId, name, email, profilePic, token} = req.body;

    const user = await User.findByIdAndUpdate(userId, {
        name: name,
        email: email,
        profilePic: profilePic,
    })
    console.log(user)
    if (user) {
      res.status(201).json({
        _id: user?._id,
        name: user?.name,
        email: user?.email,
        profilePic: user?.profilePic,
        token: token,
      });
    } else {
      res.status(400);
      throw new Error("Failed to create the user");
    }
})