const db = require('./database');
let object = { email: 'alwww@gmail.com' };

//create user
db.create(object);