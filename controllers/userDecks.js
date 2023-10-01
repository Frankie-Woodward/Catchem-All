// /* Require modules
// --------------------------------------------------------------- */
require('dotenv').config()
const express = require('express')
const router = express.Router()


// /* Require the db connection, and models
// --------------------------------------------------------------- */
const db = require('../models')

// Index Route (GET/Read): Will display all saved decks
// Index Route (GET/Read): Will display all users and their decks
router.get('/', function (req, res) {
    console.log('Accessed user deck index route');
    
    // You can use the .populate() method to include the 'decks' data
    db.User.find({}).populate('decks')
        .then(users => {
            console.log(users)
            res.render('decks/userdecks', { users });
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('An error occurred.');
        });
});



// New Route (GET/Read): This route renders a form 
// which the user will fill out to POST (create) a new deck
router.get('/new/:userId', async (req, res) => {
    const user = await db.User.findById(req.params.userId)
    res.render('decks/new-deck', {userId: req.params.userId, user: user} )
})

// Create Route (POST/Create): This route receives the POST request sent from the new route,
// creates a new deck document using the form data, 
// and redirects the user to their show page
// Create a new deck document and access its ID
router.post('/create/:userId', (req, res) => {
    db.User.findByIdAndUpdate(
        req.params.userId,
        { $push: { decks: req.body } },
        { new: true }
    )
    .then(updatedUser => { 
        // Ensure that the redirect URL matches your user profile route
        res.redirect('/users/' + req.params.userId);
    })
    .catch(error => {
        console.error(error);
        res.status(500).send('An error occurred.');
    });
});


// Show Route (GET/Read): Will display an individual deck 
// using the URL parameter (which is the document _id)
router.get('/:id', function (req, res) {
    db.User.findOne(
        { 'decks._id': req.params.id },
        { 'decks.$': true, _id: false }
    )
    .then(userDeck => {
        if (!userDeck || !userDeck.decks || userDeck.decks.length === 0) {
            // Handle the case when no user deck or decks are found
            return res.status(404).send('Deck not found');
        }

        res.render('decks/userdeck', { userDeck: userDeck.decks[0] });
    })
    .catch(error => {
        console.error(error);
        res.status(500).send('An error occurred.');
    });
});




// // // Edit Route (GET/Read): This route renders a form
// // // the user will use to PUT (edit) properties of an existing funko pop
router.get('/:id/edit', (req, res) => {
    // Find the user and the specific deck by ID
    db.User.findOne(
        { 'decks._id': req.params.id },
        { 'decks.$': true, _id: false }
    )
    .then(user => {
        if (!user || !user.decks || user.decks.length === 0) {
            // Handle the case when no user or decks are found
            return res.status(404).send('Deck not found');
        }
        const userDeck = user.decks[0]; // Get the specific userDeck
        console.log('userDeck:', userDeck); // Log userDeck to verify data
        res.render('decks/edit-deck', { userDeck });
    })
    .catch(error => {
        console.error(error);
        res.status(500).send('An error occurred.');
    });
});



// Update Route (PUT/Update): This route receives the PUT request sent from the edit route, 
// edits the specified user document using the form data,
// and redirects the user back to the show page for the updated location.
router.put('/:id', (req, res) => {
    db.User.findOne(
        { 'decks._id': req.params.id },
        { 'decks.$': true, _id: false }
    )
    .then(user => {
        if (!user || !user.decks || user.decks.length === 0) {
            // Handle the case when no user or decks are found
            return res.status(404).send('Deck not found');
        }
        const userDeck = user.decks[0]; // Get the specific userDeck
        console.log('userDeck:', userDeck); // Log userDeck to verify data
        res.render('decks/userdeck', { userDecks: user.decks, userDeck });
    })
    .catch(error => {
        console.error(error);
        res.status(500).send('An error occurred.');
    });
});

router.post('/:id', async (req, res) => {
    const ids = req.body.ids;
    const images = req.body.images;

    const result = await db.User.updateOne(
        { 'decks._id': req.params.id },
        {
            $push: {
                'decks.$.userDeckCards': { $each: ids.map((id, index) => ({ id, image: images[index] })) }
            }
        }
    );

    if (result) {
        res.json({ message: 'deck updated', ids, images });
    }
});




// Destroy Route (DELETE/Delete): This route deletes a pop document 
// using the URL parameter (which will always be the pop document's ID)
router.delete('/:id', (req, res) => {
    db.User.findOneAndUpdate(
        { 'decks._id': req.params.id },
        { $pull: { decks: { _id: req.params.id } } },
        { new: true }
    )
    .then(user => {
        if (!user) {
            return res.status(404).send('Deck not found');
        }
        res.redirect('/userdecks');
    })
});


// /* Export these routes so that they are accessible in `server.js`
// // --------------------------------------------------------------- */
module.exports = router