const express = require('express');
const router = express.Router();
const Genre = require('../models/genre'); // Import the Genre data model

router.get('/', function(req, res, next) // Display all genres
{
  const genres = Genre.all; //fetching entire genres list
  res.render('genres/index', { title: 'BookedIn || Genres', genres: genres }); //redners index page
});

router.get('/form', async (req, res, next) => //Display the genre creation form
  {
  res.render('genres/form', { title: 'BookedIn || Genres' }); //renders form page
});

router.post('/upsert', async (req, res, next) => { //update or insert genre 
  console.log('body: ' + JSON.stringify(req.body)) //for debugging
  Genre.upsert(req.body);
  let createdOrupdated = req.body.id ? 'updated' : 'created'; //to decide if this req is updating or creating
  req.session.flash = { //flash message
    type: 'info',
    intro: 'Success!',
    message: `the genre has been ${createdOrupdated}!`,
  };
  res.redirect(303, '/genres') //redirects to genres list
});

router.get('/edit', async (req, res, next) => { //edit existing genre
  let genreIndex = req.query.id;
  let genre = Genre.get(genreIndex);
  res.render('genres/form', { title: 'BookedIn || Genres', genre: genre, genreIndex: genreIndex });
});

module.exports = router;