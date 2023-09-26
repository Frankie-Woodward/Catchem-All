// // Require axios
// const axios = require('axios');

// const axiosInst = axios.create({
//     baseURL: 'https://api.pokemontcg.io/v2/',
//     headers: {
//       'X-Api-Key': '21c17e14-6bdf-482b-91bc-a3c2dade6301', 
//     },
//   });
// // Export API functions

// module.exports = {
//   getAllDecks: async function () {
//       // 1. Query the Pokedex endpoint
//       const decks = await axiosInst.get('https://api.pokemontcg.io/v2/sets?q=legalities.standard:legal')
//       // 2. Iterate over the data array to get each deck's details endpoint
//       const deckData = decks.data.data
//       const standardDecks = []
//       for (let deck of deckData) {
//         const details = {
//           id: deck.id,
//           picture: deck.images.logo,
//           name: deck.name,
//           released: deck.releaseDate,
//         };
//           standardDecks.push(details)
//       }
//       // 5. Return an array of all the pokemons sets' detailed data
//       return standardDecks
//   },
// //   getDetails: async function (pokemonId) {
// //       const pokemon = await axiosInst.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
// //       return pokemon.data
// //   }
// } 
// Require axios
const axios = require('axios');

// Create an Axios instance with custom interceptors
const axiosInst = axios.create({
    baseURL: 'https://api.pokemontcg.io/v2/',
    headers: {
        'X-Api-Key': '21c17e14-6bdf-482b-91bc-a3c2dade6301',
    },
});

// Axios request interceptor to modify the URL
axiosInst.interceptors.request.use((config) => {
    // Check if the URL contains the placeholder to replace
    if (config.url.includes('{deckName}') || config.url.includes('{deckId}')) {
        // Replace placeholders with actual values
        config.url = config.url
            .replace('{deckName}', deck.name) // Use deck.name
            .replace('{deckId}', deck.id); // Use deck.id
    }
    return config;
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
                name: deck.name,
                released: deck.releaseDate,
                // Add the details endpoint using deck.name and deck.id
                
            };
            standardDecks.push(details);
        }
        // 5. Return an array of all the Pokemon sets' detailed data
        return standardDecks;
    },
    // Add a new export for accessing deck endpoints
    getDeckEndpoint: function (deck) {
        return `https://pokemontcg.guru/set/${deck.name}/${deck.id}`;
    }

    //   getDetails: async function (pokemonId) {
    //       const pokemon = await axiosInst.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
    //       return pokemon.data
    //   }
};

