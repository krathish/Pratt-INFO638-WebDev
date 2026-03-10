const genres = [
  { name: 'Young Adult' },
  { name: 'Cooking' },
  { name: 'Sci-Fi' },
  { name: 'Murder mysteries' },
  { name: 'Self-help' }
];

exports.all = genres

exports.upsert = (genre) => {
  if (genre.id) {
    exports.update(genre);
  } else {
    exports.add(genre);
  }
}

exports.get = (idx) => {
  return genres[idx];
}

exports.add = (genre) => {
  genres.push(genre);
}

exports.update = (genre) => {
  genres[genre.id] = genre;
}

exports.edit = (genre) => {
  genres[genre.id] = genre;
}

