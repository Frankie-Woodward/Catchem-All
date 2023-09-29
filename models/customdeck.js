// Require the Mongoose package

const mongoose = require('mongoose');
const customDeckSchema = new mongoose.Schema({
    deckName: { type: String, required: true },
    deckPhoto: { type: String, required: true},
    dateAdded: { type: Date, default: Date.now },
    deckCards: { type: String }
});

// The Mongoose model will be accessed in `models/index.js`

module.exports = customDeckSchema