const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let artistSchema = new Schema({
    name: {type: String, required: true},
    picture: {data: Buffer, contentType: String},
    genre: {type: String},
    description: {type: String},
    discography: [{
        title : String,
        releaseYear: String
    }],
    concerts: [{
        type: Schema.Types.ObjectId,
        ref: 'Concert'
    }]
});

let Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;