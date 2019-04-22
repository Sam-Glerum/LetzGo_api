const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Artist = require('./artist');

let concertSchema = new Schema({
    name: {type: String, required: true},
    date: {type: Date, required: true},
    city: {type: String, required: true},
    street: {type: String, required: true},
    houseNumber: {type: String, required: true},
    zipCode: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String},
    artists: [{
        type: Schema.Types.ObjectId,
        ref: 'Artist'
    }]
});

let Concert = mongoose.model('Concert', concertSchema);

module.exports = Concert;