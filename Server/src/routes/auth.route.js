const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

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
        res.status(200).send({
            success: false,
            message: "Signup Failed!"
        })
    }
}
)
module.exports = router;