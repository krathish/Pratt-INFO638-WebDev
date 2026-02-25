const express = require('express');

const Author = require('../models/author');

const router = express.Router();

router.get('/', function(req, res, next) {
 res.render('authors/index', { title: 'BookedIn || Authors', authors: Author.all });
});

router.get('/form', function(req, res, next) {
 res.render('authors/form', { title: 'BookedIn || Authors' });
});

router.post('/upsert', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body));
  Author.upsert(req.body);
  res.redirect(303, '/authors');
});


router.get('/edit', async (req, res, next) => {
  let authorIndex = req.query.id;
  let author = Author.get(authorIndex);
  res.render('authors/form', { title: 'BookedIn || Authors', author: author, authorIndex: authorIndex });
});


module.exports = router;
