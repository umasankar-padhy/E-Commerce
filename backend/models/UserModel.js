const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        // type: String,
        type: {},
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
    role: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

module.exports = mongoose.model('users', userSchema);
