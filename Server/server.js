const express = require('express');
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 3000;
app.use(express.json());
const signupRouter = require("./src/routes/auth.route")
app.use("/api", signupRouter)
app.get("/", (req, res) => {
    res.send({
        message: "Hello From Server"
    })
})

app.listen(PORT, () => {
    console.log(`Server is Running at Port: ${PORT}`)
})