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

// const popsCtrlr = require('./controllers/popFigs')
// const reviewsCtrl = require('./controllers/pop-reviews')

/* Create the Express app
--------------------------------------------------------------- */
const app = express();


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

app.get('/deck/:id', (req, res) => {
    const deckId = req.params.id; // Get the deck ID from the URL parameter

    // Fetch the specific deck data using the deckId
    api.getAllDecks(deckId)
        .then(deckData => {
            // Render the selectdeck.ejs template and pass the deckData to it
            res.render('decks/selectdeck', { deckData });
        })
        .catch(error => {
            // Handle errors here, e.g., render an error page or redirect
            console.error(error);
            res.status(500).send('An error occurred.');
        });
});



// Tell the app to listen on the specified port

app.listen(process.env.PORT, function () {
    console.log('Express is listening to port', process.env.PORT);
});