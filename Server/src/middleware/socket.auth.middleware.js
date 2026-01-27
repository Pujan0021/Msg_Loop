const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const User = require("../models/user.model");


// socket.auth.middleware.js
const socketauthMiddleware = async (socket, next) => {
    try {
        const cookie = socket.handshake.headers.cookie;
        const token = cookie?.split("; ").find((row) => row.startsWith("jwt="))?.split("=")[1];

        if (!token) return next(new Error("Unauthorized - No token provided!"));

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select("-password");

        if (!user) return next(new Error("User not found!"));

        socket.user = user;
        socket.userId = user._id.toString();

        console.log(`Socket authenticated for user ${user.fullName} (${user._id})`);
        next();
    } catch (error) {
        console.log("Error in Socket connection:", error.message);
        return next(new Error("Error in socket connection!"));
    }
};

module.exports = socketauthMiddleware