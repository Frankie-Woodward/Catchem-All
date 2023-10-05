/* Require modules
--------------------------------------------------------------- */
require('dotenv').config()
const express = require('express')
const router = express.Router()


/* Require the db connection, and models
--------------------------------------------------------------- */
const db = require('../models')


// Index Route (GET/Read): Will display all saved decks
router.get('/', function (req, res) { 
db.User.find({})
.then(users => {
    res.render('users/users', {
        users: users
    })
})
})
// New Route (GET/Read): This route renders a form 
// which the user will fill out to POST (create) a new user profile
router.get('/new', (req, res) => {
    res.render('users/new-user')
})

// Create Route (POST/Create): This route receives the POST request sent from the new route,
// creates a new user document using the form data, 
// and redirects the user to their show page
router.post('/', (req, res) => {
    console.log(req.body)
    db.User.create(req.body)
        .then(user => res.redirect('/users/' + user._id))
})

// // Show Route (GET/Read): Will display an individual pop figure
// // using the URL parameter (which is the document _id)
router.get('/:id', function (req, res) {
    db.User.findById(req.params.id)
        .then(user => res.render('users/user-profile', { user: user}))
        .catch(() => res.send('404 Error: Page Not Found'))
})

// // Edit Route (GET/Read): This route renders a form
// // the user will use to PUT (edit) properties of an existing funko pop
router.get('/:id/edit', (req, res) => {
    db.User.findById(req.params.id)
        .then(user => res.render('users/edit-user', { user: user }))
})

// // Update Route (PUT/Update): This route receives the PUT request sent from the edit route, 
// // edits the specified user document using the form data,
// // and redirects the user back to the show page for the updated location.
router.put('/:id', (req, res) => {
    db.User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    .then(user => res.render('users/userProfile', { user: user }))
})




// // // Destroy Route (DELETE/Delete): This route deletes a pop document 
// // using the URL parameter (which will always be the pop document's ID)
router.delete('/:id', (req, res) => {
    db.User.findByIdAndRemove(req.params.id)
        .then(res.redirect('/users'))
})

// /* Export these routes so that they are accessible in `server.js`
// --------------------------------------------------------------- */
module.exports = router
