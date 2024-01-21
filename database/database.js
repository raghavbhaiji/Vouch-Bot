const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('reputation.db');


db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS reputation (userID TEXT PRIMARY KEY, reputation INTEGER)');
});

module.exports = {
  db,
};
