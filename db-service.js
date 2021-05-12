const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);

// Set some defaults
db.defaults({ player: {} }).write();
db.defaults({ match: {} }).write();
db.set("player.uid", "110").write();

const fetchPlayerById = function (uid) {
  console.log(uid);
  console.log(db.get("player").find({ uid: uid }).value());
};

module.exports = { fetchPlayerById };
