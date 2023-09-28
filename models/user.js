const mongoose = require('mongoose');
const customDeckSchema = require('./customdeck')

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    photo: { type: String },
    faction: { type: String, required: true },
    dateJoined: { type: Date, default: Date.now },
    decks: {customDeckSchema},

});

module.exports = mongoose.model('User', userSchema);