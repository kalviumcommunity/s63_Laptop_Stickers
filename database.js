const mongoose = require("mongoose");
require("dotenv").config();

const connectDatabase = () => {
    mongoose
        .connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then((data) => {
            console.log(`MongoDB connected with server: ${data.connection.host}`);
        })
        .catch((err) => {
            console.error(`Database connection failed: ${err.message}`);
            process.exit(1); // Stop the server if the DB connection fails
        });
};

module.exports = connectDatabase;
