const low = require("lowdb"),
  QRCode = require("qrcode"),
  FileSync = require("lowdb/adapters/FileSync"),
  random = require("./random");

const adapter = new FileSync("db.json");
const db = low(adapter);

db.defaults({
  players: [],
  match: {
    teams: [
      {
        players: [],
        goals: [],
      },
      {
        players: [],
        goals: [],
      },
    ]
  },
}).write();

const players = {
  getAll: () => {
    return db.get("players").value();
  },

  getByName: (name) => {
    return db.get("players").find({ name: name }).value();
  },
  create: (name) => {
    QRCode.toDataURL(name).then((qr) => {
      db.get("players")
        .push({ name: name, qr: qr })
        .write();
    });
  },
};

const FULL_TEAM = 2;

const match = {
  get: () => {
    return db.get("match").value();
  },
  addPlayerToRandomTeam: (name) => {
    const teams = db.get("match.teams").value();
    if (teams[0].players.length >= FULL_TEAM) {
      if (teams[1].players.length >= FULL_TEAM) {
        return;
      }
      db.get("match.teams[1].players")
        .push(name)
        .write();
    } else if (teams[1].players.length >= FULL_TEAM) {
      if (teams[0].players.length >= FULL_TEAM) {
        return;
      }
      db.get("match.teams[0].players")
        .push(name)
        .write();
    } else if (teams[0].players.length != teams[1].players.length) {
      if (teams[0].players.length < teams[1].players.length) {
        db.get("match.teams[0].players")
          .push(name)
          .write();
      } else {
        db.get("match.teams[1].players")
          .push(name)
          .write();
      }
    } else if (random.bool()) {
      db.get("match.teams[0].players")
        .push(name)
        .write();
    } else {
      db.get("match.teams[1].players")
        .push(name)
        .write();
    }
  },
  addPlayerToTeam: (name, team) => {

  },
  removePlayerFromTeam: (name, team) => {

  },
  shufflePlayers: () => {
    const teams = db.get("match.teams").value();
    const players = [];
    players.push(...teams[0].players);
    players.push(...teams[1].players);
    random.shuffleArray(players);
    const n = players.length / 2;
    db.get("match.teams[0].players")
      .assign(players.slice(0, n))
      .write();
    db.get("match.teams[1].players")
      .assign(players.slice(n))
      .write();
  },
  reset: () => {
    db.get("match").assign({
      endScore: 6,
      teams: [
        {
          players: [],
          score: 0,
        },
        {
          players: [],
          score: 0,
        },
      ]
    }).write();
  },
};

module.exports = { players, match };
