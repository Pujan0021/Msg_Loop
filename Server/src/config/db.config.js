const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const MONGO_URI = process.env.MONGO_URI;
const mongooseConnection = async () => {
    // console.log("MongoURI:", MONGO_URI)
    try {

        await mongoose.connect(MONGO_URI)
        console.log("<<<---Database Connected Successfully--->>>")

    } catch (error) {
        console.log("<<<  Error Connecting to DB >>>>", error.message

        );
        process.exit(1);
    }


}
module.exports = mongooseConnection;