//framework imports
const express = require('express');
const handlebars = require('express-handlebars').create();
const bodyParser = require('body-parser');
const { credentials } = require('./config')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')

//application improts
const indexRouter = require('./routes/index');
const authorsRouter = require('./routes/authors');
const booksRouter = require('./routes/books');


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

// session configuration
//make it possible to use flash messages, and pass them to the view
app.use((req, res, next) => {
  res.locals.flash = req.session.flash
  delete req.session.flash
  next()
})

//application setup
app.use('/', indexRouter);
app.use('/authors', authorsRouter);
app.use('/books', booksRouter);


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
