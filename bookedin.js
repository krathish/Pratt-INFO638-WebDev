const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const indexRouter = require('./routes/index');
const authorsRouter = require('./routes/authors');
const booksRouter = require('./routes/books');

var handlebars = require('express-handlebars').create({
  layoutsDir: path.join(__dirname, 'Views', 'Layouts'),
  defaultLayout: 'main',
});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'Views'));

app.use('/', indexRouter);
app.use('/authors', authorsRouter);
app.use('/books', booksRouter);

app.use((req, res) => {
  res.status(404);
  res.send('<h1>404 - Not Found</h1>');
});

app.use((err, req, res, next) => {
  console.error(err.message);
  res.type('text/plain');
  res.status(500);
  res.send('500 - Server Error');
});

app.listen(port, () => console.log(
  `Express started on http://localhost:${port}; ` +
  `press Ctrl-C to terminate.`
));

    