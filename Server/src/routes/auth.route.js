const express = require("express");
const router = express.Router();

router.post("/auth/signup", (req, res) => {
    res.json({
        message: req.body
    })
    console.log(req.body)
})
module.exports = router;