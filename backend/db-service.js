const low = require("lowdb"),
  FileSync = require("lowdb/adapters/FileSync"),
  _ = require('lodash');

const adapter = new FileSync("db.json");
const db = low(adapter);

db.defaults({
  players: [],
  match: {
    start: 0,
    end: 0,
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
  pastmatches: [],
}).write();

const players = {
  getAll: () => {
    return db.get("players").value();
  },
  getByName: (name) => {
    return db.get("players").find({ name: name }).value();
  },
  create: (name) => {
    db.get("players")
      .push({ name: name })
      .write();
  },
};

const match = {
  get: () => {
    return db.get("match").value();
  },
  start: (teams) => {
    db.get("match").assign({
      start: Date.now(),
      end: 0,
      teams: teams.map((players) => {
        return { players: players, goals: [] };
      }),
    }).write();
  },
  end: () => {
    const m = db.get("match").value();
    m.end = Date.now();
    console.log(m);
    pastmatches.insert(_.cloneDeep(m));
    match.reset();
  },
  addGoal: (team) => {
    db.get("match.teams").get(team)
      .get("goals").push(Date.now()).write();
  },
  reset: () => {
    db.get("match").assign({
      start: 0,
      end: 0,
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
    }).write();
  }
};

const pastmatches = {
  getAll: () => {
    return db.get("pastmatches").value();
  },
  insert: (match) => {
    db.get("pastmatches")
      .push(match)
      .write();
  },
};

module.exports = { players, match, pastmatches };
