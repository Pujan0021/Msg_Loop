const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();


router.post("/auth/signup", async (req, res) => {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
        return res.status(400).send({
            success: false,
            message: "All the fields are required!"
        })
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).send({
            success: false,
            message: "User already exists!"
        })
    }
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    try {
        const user = new User({
            fullName,
            email,
            password: hashedPassword
        })
        await user.save();

        res.status(201).send({
            success: true,
            user: {
                fullName,
                email
            }
        })
    } catch (error) {
        console.log("Signup Failed !", error.message);
        res.status(500).send({
            success: false,
            message: "Signup Failed!"
        })
    }
}
);
router.post("/auth/login", async (req, res) => {
    const JWT_SECRET = process.env.JWT_SECRET;
    // console.log(JWT_SECRET)
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send({
            success: false,
            message: "All the fields are required!"
        })
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User does not exist!"
            })
        }
        const verifyPassword = await bcrypt.compare(password, user.password);
        if (!verifyPassword) {
            return res.status(401).send({
                success: false,
                message: "Invalid email or password!"
            })
        }
        const token = jwt.sign({ id: user._id }, JWT_SECRET, {
            expiresIn: "1h"
        });
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 60 * 60 * 1000 //1h
        });
        res.status(200).send({
            success: true,
            message: "Login Successfully"
        })
    } catch (error) {
        console.log("Login Failed !", error.message);
        res.status(500).send({
            success: false,
            message: "Login Failed!"
        })
    }
})
module.exports = router;