const books = [
 {title: "Leviathan Wakes", publishingYear: 2011},
 {title: "Caliban's War", publishingYear: 2012}
];

exports.add = (book) => {
 books.push(book);
}

exports.all = books
