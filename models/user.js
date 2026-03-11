const users = [
  { email: 'krathishprakash01@gmail.com', name:"Krathish", password:"password2026" }
];
var crypto = require('crypto');
const createSalt = () => {
  return crypto.randomBytes(16).toString('hex');
}

const encryptPassword = (password, salt) => {
  return crypto.pbkdf2Sync(password, salt, 310000, 32, 'sha256').toString('hex')
}

exports.add = (user) => {
  let salt = createSalt();
  let new_user = {
    email: user.email,
    name: user.name,
    salt: salt,
    encryptedPassword: encryptPassword(user.password, salt)
  }
  console.log(new_user)
  users.push(new_user);
}
exports.getByEmail = (email) => {
  return users.find((user) => user.email === email);
}

exports.login = (login) => {
  let user = exports.getByEmail(login.email);
  if (!user) {
    return null;
  }
  
  let encryptedPassword = encryptPassword(login.password, user.salt);

  if (user.encryptedPassword === encryptedPassword) {
    return user;
  }
  return null;
}

exports.all = users