// Require the Mongoose package

const mongoose = require('mongoose');


const customDeckSchema = new mongoose.Schema({
    name: { type: String, required: true },
    photo: { type: String, required: true},
    dateAdded: { type: Date, default: Date.now },
    cards: { type: String }
});

// The Mongoose model will be accessed in `models/index.js`

module.exports =  customDeckSchema