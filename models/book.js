const books = [
  {title: "Leviathan Wakes", yearPublished: "1982"},
  {title: "Columbus Day", yearPublished: "1990"},
  {title: "The Three-Body Problem", yearPublished: "1928"},
]

exports.add = (book) => {
  books.push(book);
}

exports.all = books