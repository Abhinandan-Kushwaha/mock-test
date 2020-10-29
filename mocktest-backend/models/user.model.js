const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: { type: String, required: true, trim: true},
    userId:{type: String, required: true, trim: true},
}, {
        timestamps: true
    });

const User = mongoose.model('User', userSchema);
module.exports = User;