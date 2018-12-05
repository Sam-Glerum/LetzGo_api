const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ticketSchema = new Schema({
    concert: {
        type: Schema.Types.ObjectId,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    ticketCode: {
        type: Number,
        unique: true,
        required: true
    }
});

let Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;