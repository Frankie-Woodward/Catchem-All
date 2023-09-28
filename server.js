/* Require modules
--------------------------------------------------------------- */
require('dotenv').config()
const path = require('path');
const express = require('express');
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");
const methodOverride = require('method-override');

/* Require the db connection, models, and seed data
--------------------------------------------------------------- */
const db = require('./models');
const api = require('./models');


/* Require the routes in the controllers folder
--------------------------------------------------------------- */

const userCtrlr = require('./controllers/users')
const userDeckCtrlr = require('./controllers/userdecks')

/* Create the Express app
--------------------------------------------------------------- */
const app = express();
const axios = require('axios');
let axiosInst = axios

/* Configure the app to refresh the browser when nodemon restarts
--------------------------------------------------------------- */
const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
    // wait for nodemon to fully restart before refreshing the page
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});

/* Configure the app (app.set)
--------------------------------------------------------------- */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/* Middleware (app.use)
--------------------------------------------------------------- */
app.use(express.static('public'))
app.use(connectLiveReload());
// Body parser: used for POST/PUT/PATCH routes: 
// this will take incoming strings from the body that are URL encoded and parse them 
// into an object that can be accessed in the request parameter as a property called body (req.body).
app.use(express.urlencoded({ extended: true }));
// Allows us to interpret POST requests from the browser as another request type: DELETE, PUT, etc.
app.use(methodOverride('_method'));



/* Mount routes
--------------------------------------------------------------- */
// HOME ROUTE
app.get('/', (req, res) => {
    api.getAllDecks()
        .then(decks => res.render('home', { decks: decks }))
})


// Get deck data and generate deck endpoints
// Get deck data and generate deck endpoints
app.get('/selectdeck/:name', async (req, res) => {
    const deckName = req.params.name;

    try {
        // Get all decks and find the specific deck by name
        const standardDecks = await api.getAllDecks();
        const deck = standardDecks.find(deck => deck.name === deckName);

        if (!deck) {
            // Handle the case when the deck with the specified name is not found
            return res.status(404).send('Deck not found');
        }

        if (!deck.id) {
            // Handle the case when the deck's ID is missing or undefined
            return res.status(500).send('Deck ID is missing or undefined');
        }

        const deckEndpoint = api.getDeckEndpoint(deck.id);
        console.log('deckEndpoint:', deckEndpoint);

        // Fetch the cards for the selected deck
        const cardsResponse = await axiosInst.get(deckEndpoint);
        const deckCards = cardsResponse.data.data;
        console.log(deckCards);

        // Render the EJS template with deck data and the retrieved deck cards
        res.render('decks/selectdeck', { deck, deckCards, deckName });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred.');
    }
});





app.use('/users', userCtrlr)

// app.use('/userdecks', userDeckCtrlr)

// The "catch-all" route: Runs for any other URL that doesn't match the above routes
app.get('*', function (req, res) {
    res.render('404')
});

// Tell the app to listen on the specified port

app.listen(process.env.PORT, function () {
    console.log('Express is listening to port', process.env.PORT);
});
