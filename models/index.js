// Require the Mongoose package & your environment configuration
const mongoose = require('mongoose');
require('dotenv').config()

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODBURI);
const db = mongoose.connection

db.on('connected', function () {
    console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
});

// Export my models and seed data to my server.js

// Require axios
const axios = require('axios');

// Create an Axios instance with custom interceptors
const axiosInst = axios.create({
    baseURL: 'https://api.pokemontcg.io/v2/',
    headers: {
        'X-Api-Key': '21c17e14-6bdf-482b-91bc-a3c2dade6301',
    },
});


// Export API functions
module.exports = {
    getAllDecks: async function () {
        // 1. Query the Pokedex endpoint
        const decks = await axiosInst.get('https://api.pokemontcg.io/v2/sets?q=legalities.standard:legal');
        // 2. Iterate over the data array to get each deck's details endpoint
        const deckData = decks.data.data;
        const standardDecks = [];
        for (let deck of deckData) {
            const details = {
                id: deck.id,
                picture: deck.images.logo,
                name: deck.name.toLowerCase(),
                released: deck.releaseDate,
                // Add the details endpoint using deck.name and deck.id
                
            };
            standardDecks.push(details);
        }
        // 5. Return an array of all the Pokemon sets' detailed data
        return standardDecks;
    },
    // Add a new export for accessing deck endpoints
  // Add a new export for accessing deck endpoints
getDeckEndpoint: function (deckId) {
    return `https://api.pokemontcg.io/v2/cards?q=set.id:${deckId}`;
},

User: require('./user'),

};

