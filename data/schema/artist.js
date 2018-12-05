const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let artistSchema = new Schema({
    name: {type: String, required: true},
    picture: {data: Buffer, contentType: String},
    genre: {type: String},
    description: {type: String},
    discography: [{
        title : String,
        releaseyear: String
    }]
});

let Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;