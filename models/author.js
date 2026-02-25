const authors = [
 {firstName: "James", lastName: "S. A. Corey"},
 {firstName: "Craig", lastName: "Alanson"},
 {firstName: "Cixin", lastName: "Liu"},
 {firstName: "John", lastName: "Scalzi"},
]

exports.upsert = (author) => {
  if (author.id) {
    exports.update(author);
  } else {
    exports.add(author);
  }
}

exports.update = (author) => {
  authors[author.id] = author;
}

exports.get = (idx) => {
  return authors[idx];
}


exports.all = authors;
exports.add = (author) => {
 authors.push(author);
};


