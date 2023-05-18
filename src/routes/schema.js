const mongoose = require("mongoose");

const collection = "users"

const schema = new mongoose.Schema({
    id: Number,
    firstName: String,
    lastName: String,
    userName: String,
    password: String,
});

const userModel = mongoose.model(collection, schema);

module.exports = userModel;