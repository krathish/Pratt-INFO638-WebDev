// comment model - stores comments on books
const comments = [
  {id: "0", bookId: "0", userEmail: "kprakash@pratt.edu", text: "wow wow wow!!"},
  {id: "1", bookId: "0", userEmail: "james@gmail.com", text: "this is a good book but the ending was a bit meh"},
  {id: "2", bookId: "0", userEmail: "hater@pratt.edu", text: "meh"},
];

// get the next available id
function getNextId() {
  return Math.max(...comments.map(c => c.id))+1;
}

// add a new comment
exports.add = (comment) => {
  comment.id = getNextId();
  comments.push(comment);
}

// update an existing comment
exports.update = (comment) => {
  comments[comment.id] = comment;
}

// create or update a comment
exports.upsert = (comment) => {
  if (comment.id) {
    exports.update(comment);
  } else {
    exports.add(comment);
  }
}

// get a comment by id
exports.get = (id) => {
  return comments.find((comment) => {
    return comment.id == id;
  });
}

// get all comments for a specific book
exports.AllForBook = (bookId) => {
  return comments.filter((comment) => {
    return comment.bookId == bookId;
  });
}
