const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    username: {type: String, unique: true, required: true, dropDups: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    dateOfBirth: {type: Date, default: Date.now},
    tickets: [{
        type: Schema.Types.ObjectId,
        ref: 'Ticket'
    }]
});

let User = mongoose.model('User', userSchema);

module.exports = User;