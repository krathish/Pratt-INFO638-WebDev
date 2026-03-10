const express = require('express');

const Author = require('../models/author');

const router = express.Router();

router.get('/', function(req, res, next) {
 res.render('authors/index', { title: 'BookedIn || Authors', authors: Author.all });
});

router.post('/upsert', function(req, res, next) {
  console.log(JSON.stringify(req.body));
  Author.upsert(req.body);
  let createdOrupdated = req.body.id ? 'updated' : 'created';
  req.session.flash = {
    type: 'info',
    intro: 'Success!',
    message: `the author has been ${createdOrupdated}!`,
  };
  res.redirect(303, "/authors");
});


router.get('/edit', async (req, res, next) => {
  let authorIndex = req.query.id;
  let author = Author.get(authorIndex);
  res.render('authors/form', { title: 'BookedIn || Authors', author: author, authorIndex: authorIndex });
});


module.exports = router;
