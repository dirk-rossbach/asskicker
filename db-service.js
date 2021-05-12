const low = require("lowdb");
const { nanoid } = require("nanoid")
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);

db.defaults({
  players: [],
  match: {}
}).write();

const players = {
  getAll: () => {
    return db.get("players")
      .value();
  },
  getById: () => {
    return db.get("players")
      .find({ uid: uid })
      .value();
  },
  create: (name) => {
    return db.get('players')
      .push({ uid: nanoid(12), name: name })
      .write();
  },
};

module.exports = { players };
