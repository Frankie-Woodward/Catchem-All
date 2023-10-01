// Require the Mongoose package
const mongoose = require('mongoose');
const customDeckSchema = new mongoose.Schema({
    userDeckName: { 
        type: String, 
        required: false 
    },
    userDeckPhoto: { 
        type: String, 
        required: false
    },
    userDeckDateAdded: { 
        type: Date, 
        default: Date.now 
    },
    userDeckCards: [
        {
          id: String,
          image: String
        }
      ]
      
});

// The Mongoose model will be accessed in `models/index.js`

module.exports = customDeckSchema