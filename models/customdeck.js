// Require the Mongoose package
const mongoose = require('mongoose');
const customDeckSchema = new mongoose.Schema({
    userDeckName: { 
        type: String, 
        required: true 
    },
    userDeckPhoto: { 
        type: String, 
        required: true
    },
    userDeckDateAdded: { 
        type: Date, 
        default: Date.now 
    },
    userDeckCards: { 
        type: String,
        required: false 
    }
});

// The Mongoose model will be accessed in `models/index.js`

module.exports = customDeckSchema