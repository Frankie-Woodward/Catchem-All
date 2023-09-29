// /* Require modules
// --------------------------------------------------------------- */
require('dotenv').config()
const express = require('express')
const router = express.Router()


// /* Require the db connection, and models
// --------------------------------------------------------------- */
const db = require('../models')


// // Index Route (GET/Read): Will display all saved decks
router.get('/', (req, res) => {
    db.User.find({}, { decks: true, _id: false })
        .then(users => {
            // format query results to appear in one array, 
            // rather than an array of objects containing arrays 
            const flatList = []
            for (let user of users) {
                flatList.push(...user.decks)
            }
            res.render('decks/userdecks',
                { decks: flatList }
            )
        })
});
// New Route (GET/Read): This route renders a form 
// which the user will fill out to POST (create) a new deck
router.get('/new/:userId', async (req, res) => {
    const user = db.User.findById(req.params.userId)
    res.render('decks/new-deck', {user: user} )
})

// Create Route (POST/Create): This route receives the POST request sent from the new route,
// creates a new user document using the form data, 
// and redirects the user to their show page
router.post('/create/:userId', (req, res) => {
    db.User.findByIdAndUpdate(
        req.params.userId,
        { $push: { decks: req.body } },
        { new: true }
    )
    .then(user => res.redirect('/decks/' + user._id))
});
// Show Route (GET/Read): Will display an individual pop figure
// using the URL parameter (which is the document _id)
router.get('/:userId', function (req, res) {
    db.User.findOne(
        { 'decks._id': req.params.id },
        { 'decks.$': true, _id: false }
        )
        .then(user => {
            
            res.render('decks/userdeck', 
            { user: user.decks[0] }
            
            )
        })
});

// // // Edit Route (GET/Read): This route renders a form
// // // the user will use to PUT (edit) properties of an existing funko pop
// router.get('/:id/edit', (req, res) => {
//     db.User.findById(req.params.id)
//         .then(user => res.render('users/edit-user', { user: user }))
// })

// Update Route (PUT/Update): This route receives the PUT request sent from the edit route, 
// edits the specified user document using the form data,
// and redirects the user back to the show page for the updated location.
// router.put('/:id', (req, res) => {
//     db.User.findByIdAndUpdate(
//         req.params.id,
//         req.body,
//         { new: true }
//     )
//     .then(user => res.render('users/userProfile', { user: user }))
// })git sstatus




// Destroy Route (DELETE/Delete): This route deletes a pop document 
// using the URL parameter (which will always be the pop document's ID)
// router.delete('/:id', (req, res) => {
//     db.User.findByIdAndRemove(req.params.id)
        // .then(res.redirect('/users'))
// })

// /* Export these routes so that they are accessible in `server.js`
// // --------------------------------------------------------------- */
module.exports = router