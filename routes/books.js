const express = require('express');

const Book = require('../models/book');
const Author = require('../models/author'); //import authors
const Genre = require('../models/genre'); //import genres

const router = express.Router();

router.get('/', function(req, res, next) { // Display all books with authors and genres
 const books = Book.all
 res.render('books/index', { title: 'BookedIn || Books', books: books, authors: Author.all, genres: Genre.all });
});

router.get('/form', async (req, res, next) => { //form to add
 res.render('books/form', { title: 'BookedIn || Books', authors: Author.all, genres: Genre.all });
});

router.post('/upsert', async (req, res, next) => { //update or insert
  console.log('body: ' + JSON.stringify(req.body))
  Book.upsert(req.body);
  let createdOrupdated = req.body.id ? 'updated' : 'created'; //check is request is update or create
  req.session.flash = { //flash message
    type: 'info',
    intro: 'Success!',
    message: `the book has been ${createdOrupdated}!`,
  };
  res.redirect(303, '/books')
});


router.get('/edit', async (req, res, next) => {
  let bookIndex = req.query.id;
  let book = Book.get(bookIndex);
  res.render('books/form', { title: 'BookedIn || Books', book: book, bookIndex: bookIndex, authors: Author.all, genres: Genre.all });
});

router.get('/show/:id', async (req, res, next) => {
  let templateVars = {
    title: 'BookedIn || Books',
    book: Book.get(req.params.id)
  }
   if (templateVars.book.authorIds) {
    templateVars['authors'] = templateVars.book.authorIds.map((authorId) => Author.get(authorId))
  }
  if (templateVars.book.genreId) {
    templateVars['genre'] = Genre.get(parseInt(templateVars.book.genreId))
  }
  res.render('books/show', templateVars);
});

module.exports = router;
