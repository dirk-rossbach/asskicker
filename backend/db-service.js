const low = require("lowdb"),
  FileSync = require("lowdb/adapters/FileSync"),
  _ = require("lodash");

const adapter = new FileSync("db.json");
const db = low(adapter);

db.defaults({
  players: [],
  match: {
    lastGoal: undefined,
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
    ],
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
    if (db.get("players").find({ name: name }).value()) {
      throw new Error("player exists");
    }
    db.get("players").push({ name: name }).write();
  },
};

const match = {
  get: () => {
    return db.get("match").value();
  },
  start: (teams) => {
    let match = db.get("match").value();
    if (match.start != 0) {
      throw new Error("match already running");
    }
    db.get("match")
      .assign({
        start: Date.now(),
        end: 0,
        teams: teams.map((players) => {
          return { players: players, goals: [] };
        }),
      })
      .write();
  },
  end: () => {
    const m = db.get("match").value();
    if (m.start == 0) {
      throw new Error("no match running");
    }
    m.end = Date.now();
    pastmatches.insert(_.cloneDeep(m));
    match.reset();
  },
  addGoal: (team) => {
    db.get("match.teams").get(team).get("goals").push(Date.now()).write();
    db.set("match.lastGoal", team).write();
  },
  removeLastGoal: () => {
    const goals = [];
    const teams = db.get("match.teams").value();
    teams[0].goals.forEach((goal) => {
      goals.push(goal);
    });
    teams[1].goals.forEach((goal) => {
      goals.push(goal);
    });
    const lastGoal = goals.sort()[goals.length - 1];
    db.get("match.teams").get(0).get("goals").pull(lastGoal).write();
    db.get("match.teams").get(1).get("goals").pull(lastGoal).write();
  },
  reset: () => {
    db.get("match")
      .assign({
        lastGoal: null,
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
        ],
      })
      .write();
  },
};


const pastmatches = {
  getAll: () => {
    return db.get("pastmatches").value();
  },
  insert: (match) => {
    db.get("pastmatches").push(match).write();
  },
};

module.exports = { players, match, pastmatches };
