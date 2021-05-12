const low = require("lowdb"),
  QRCode = require("qrcode"),
  FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);

db.defaults({
  players: [],
  match: {},
}).write();

const players = {
  getAll: () => {
    return db.get("players").value();
  },

  getByName: (name) => {
    return db.get("players").find({ name: name }).value();
  },
  create: (name) => {
    const qr = QRCode.toDataURL(name);
    return db.get("players").push({ name: name, qr: qr }).write();
  },
};

module.exports = { players };
