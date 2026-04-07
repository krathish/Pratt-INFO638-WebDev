const express = require('express');
const router = express.Router();

const Comment = require('../models/comment');

// create a new comment on a book
router.post('/upsert', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body))
  let bookId = req.body.bookId;
  let redirect = `/books/show/${bookId}`;
  // only logged-in users can comment
  if (!req.session.currentUser) {
    req.session.flash = {
      type: 'danger',
      intro: 'Error!',
      message: 'You must be logged in to comment',
    };
    return res.redirect(303, redirect);
  }
  // set the user email from session
  let comment = {
    bookId: req.body.bookId,
    userEmail: req.session.currentUser.email,
    text: req.body.text
  };
  Comment.add(comment);
  req.session.flash = {
    type: 'info',
    intro: 'Success!',
    message: 'Your comment has been added',
  };
  res.redirect(303, redirect);
});

// show the edit form for a comment
router.get('/edit', async (req, res, next) => {
  let comment = Comment.get(req.query.id);
  // check that the comment exists
  if (!comment) {
    req.session.flash = {
      type: 'danger',
      intro: 'Error!',
      message: 'Comment not found',
    };
    return res.redirect(303, '/books');
  }
  // check that the current user owns this comment
  if (!req.session.currentUser || req.session.currentUser.email !== comment.userEmail) {
    req.session.flash = {
      type: 'danger',
      intro: 'Error!',
      message: 'You can only edit your own comments',
    };
    return res.redirect(303, `/books/show/${comment.bookId}`);
  }
  res.render('comments/form', {
    title: 'BookedIn || Edit Comment',
    comment: comment
  });
});

// update a comment
router.post('/update', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body))
  let comment = Comment.get(req.body.id);
  let redirect = `/books/show/${req.body.bookId}`;
  // check that the current user owns this comment
  if (!req.session.currentUser || req.session.currentUser.email !== comment.userEmail) {
    req.session.flash = {
      type: 'danger',
      intro: 'Error!',
      message: 'You can only edit your own comments',
    };
    return res.redirect(303, redirect);
  }
  // update the comment text
  comment.text = req.body.text;
  Comment.update(comment);
  req.session.flash = {
    type: 'info',
    intro: 'Success!',
    message: 'Your comment has been updated',
  };
  res.redirect(303, redirect);
});

module.exports = router;
