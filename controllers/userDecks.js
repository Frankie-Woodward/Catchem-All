/* Require modules
--------------------------------------------------------------- */
require('dotenv').config()
const express = require('express')
const router = express.Router()


/* Require the db connection, and models
--------------------------------------------------------------- */
const db = require('../models')


// // Index Route (GET/Read): Will display all pops
// router.get('/', function (req, res) { 
// db.standardDecks.find({})
// .sort({ newlyAdded: -1 })
// .then(pops => {
//     res.render('home', {
//         pops: pops
//     })
// })
// })
// // New Route (GET/Read): This route renders a form 
// // which the user will fill out to POST (create) a new location
// router.get('/new', (req, res) => {
//     res.render('new-form')
// })

// // Create Route (POST/Create): This route receives the POST request sent from the new route,
// // creates a new pet document using the form data, 
// // and redirects the user to the new pet's show page
// router.post('/', (req, res) => {
//     console.log(req.body)
//     db.Pop.create(req.body)
//         .then(pop => res.redirect('/popFigs/' + pop._id))
// })

// // Show Route (GET/Read): Will display an individual pop figure
// // using the URL parameter (which is the document _id)
// router.get('/:id', function (req, res) {
//     db.Pop.findById(req.params.id)
//         .then(pop => res.render('pop-data', { pop: pop}))
//         .catch(() => res.send('404 Error: Page Not Found'))
// })

// // Edit Route (GET/Read): This route renders a form
// // the user will use to PUT (edit) properties of an existing funko pop
// router.get('/:id/edit', (req, res) => {
//     db.Pop.findById(req.params.id)
//         .then(pop => res.render('edit-form', { pop: pop }))
// })
// // Buy Now Update Route
// router.post('/:id', (req, res) => {
//     const popId = req.params.id;
//     const decrementAmount = 1;
//     db.Pop.updateOne(
//         {_id: popId },
//         { $inc: { quantity: -decrementAmount } },
//         { new: true }
//     )
//     // .then(updatedPop => {
//     //     res.render('/popFigs/' + popId);
//     .then(updatedPop => {
//     // Wait for a short time (e.g., 500 milliseconds) before redirecting
//     setTimeout(() => {
//         res.redirect('/popFigs/' + popId);
//     }, 500);
//     })
// });
// // Update Route (PUT/Update): This route receives the PUT request sent from the edit route, 
// // edits the specified pop document using the form data,
// // and redirects the user back to the show page for the updated location.
// router.put('/:id', (req, res) => {
//     db.Pop.findByIdAndUpdate(
//         req.params.id,
//         req.body,
//         { new: true }
//     )
//     .then(pop => res.render('pop-data', { pop: pop }))
// })




// // // Destroy Route (DELETE/Delete): This route deletes a pop document 
// // using the URL parameter (which will always be the pop document's ID)
// router.delete('/:id', (req, res) => {
//     db.Pop.findByIdAndRemove(req.params.id)
//         .then(res.redirect('/'))
// })

// /* Export these routes so that they are accessible in `server.js`
// --------------------------------------------------------------- */
// module.exports = router
