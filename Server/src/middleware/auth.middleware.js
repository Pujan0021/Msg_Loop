const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).send({
                success: false,
                message: "UnAuthorized !"
            })
        }
        const JWT_SECRET = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();

    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Failed to get token"
        })
    }
}
module.exports = authMiddleware;