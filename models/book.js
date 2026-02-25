const books = [
 {title: "Leviathan Wakes", publishingYear: 2011},
 {title: "Caliban's War", publishingYear: 2012}
];

exports.upsert = (book) => {
  if (book.id) {
    exports.update(book);
  } else {
    exports.add(book);
  }
}

exports.update = (book) => {
  books[book.id] = book;
}

exports.get = (idx) => {
  return books[idx];
}

exports.edit = (book) => 
{
    books[book.id] = book;
}

exports.all = books

exports.add = (book) => {
 books.push(book);
}


