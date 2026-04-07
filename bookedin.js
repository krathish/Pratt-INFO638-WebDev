//framework imports
const express = require('express');
const handlebars = require('express-handlebars').create({
    helpers: {
      and: (a, b) => a && b,
      in: (arr, val) => Array.isArray(arr) && arr.map(String).includes(String(val)),
      eq: (a, b) => a == b
    }
  });
const bodyParser = require('body-parser');
const { credentials } = require('./config')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const csrf = require('csurf')

//application imports
const indexRouter = require('./routes/index');
const authorsRouter = require('./routes/authors');
const booksRouter = require('./routes/books');
const genresRouter = require('./routes/genres');
const usersRouter = require('./routes/users');
const booksUsersRouter = require('./routes/books_users');
const commentsRouter = require('./routes/comments');


//framework setup
const app = express();
const port = 3000;

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser(credentials.cookieSecret));
app.use(expressSession({
  secret: credentials.cookieSecret,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
}));
app.use('/users', usersRouter);

app.use(csrf({ cookie: true }))
app.use((req, res, next) => {
  res.locals._csrfToken = req.csrfToken()
  next()
})

// session configuration
//make it possible to use flash messages, and pass them to the view
app.use((req, res, next) => {
  res.locals.flash = req.session.flash
  delete req.session.flash
  next()
})
app.use((req, res, next) => {
  res.locals.currentUser = req.session.currentUser
  next()
})


//application setup
app.use('/', indexRouter);
app.use('/authors', authorsRouter);
app.use('/books', booksRouter);
app.use('/genres', genresRouter);
app.use('/books_users', booksUsersRouter);
app.use('/comments', commentsRouter);


app.use((_req, res) => {
 res.status(404);
 res.send(" 404 - please go away, i am not home! ");
});

app.use((err, _req, res, _next) => {
 console.error(err.message);
 res.status(500);
 res.send(" 500 - Aaaahrg, why did you do this to me! ");
})




app.listen(port, () => console.log(
`Express started on http://localhost:${port}
press Ctrl-C to terminate.`));
