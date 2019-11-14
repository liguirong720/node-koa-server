const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    password: String,
    role: String,
    email: String
});

module.exports = userSchema;
