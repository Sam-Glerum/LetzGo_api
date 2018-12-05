const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    username: {type: String, unique: true, required: true, dropDups: true},
    email: {type: String, unique: true, required: true, dropDups: true},
    password: {type: String, required: true},
    dateofbirth: {type: Date, default: Date.now}
});

let User = mongoose.model('User', userSchema);

module.exports = User;