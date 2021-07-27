const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    name: {
        type: String,
    },
    loginstatus: {
        type: Boolean,
        default: false
    }



});

module.exports = mongoose.model("User", UserSchema)