const low = require("lowdb"),
  FileSync = require("lowdb/adapters/FileSync"),
  _ = require("lodash"),
  compositeOpponent = require('glicko2-composite-opponent'),
  glicko2 = require('glicko2').Glicko2;

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
    db.get("players").push({ name: name, rating: { solo: 1500, duo: 1500 } }).write();
  },
  updateRatings: (name, ratings) => {
    console.log(name, ratings);
    return db.get("players").find({ name: name }).get("rating").assign(ratings).write();
  },
};

const match = {
  get: () => {
    return db.get("match").value();
  },
  start: (teams) => {
    let match = db.get("match").value();
    if (match.start && match.start != 0) {
      throw new Error("match already running");
    }
    if (teams.length != 2 || teams[0].length != teams[1].length) {
      throw new Error("invalid teams");
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
    const score = m.teams[0].goals.length - m.teams[1].goals.length;
    if (score != 0) {
      const isSolo = m.teams[0].players.length == 1;
      const gr = new glicko2({
        tau: 0.5,
        rating: 1500,
        rd: 100,
        vol: 0.06
      });
      const a = m.teams[0].players.map((player) => {
        const p = players.getByName(player);
        const r = isSolo ? p.rating.solo : p.rating.duo;
        return gr.makePlayer(r);
      });
      const b = m.teams[1].players.map((player) => {
        const p = players.getByName(player);
        const r = isSolo ? p.rating.solo : p.rating.duo;
        return gr.makePlayer(r);
      });
      const sn = score > 0 ? 1 : 0;
      const matches = compositeOpponent(a, b, sn);
      gr.updateRatings(matches);
      const pln = m.teams[0].players.concat(m.teams[1].players);
      const plr = gr.getPlayers();
      for (let i = 0; i < plr.length; i++) {
        const nr = plr[i].getRating();
        const r = isSolo ? { solo: nr } : { duo: nr };
        players.updateRatings(pln[i], r);
      }
    }
    pastmatches.insert(_.cloneDeep(m));
    match.reset();
  },
  addGoal: (team) => {
    db.get("match.teams").get(team).get("goals").push(Date.now()).write();
  },
  reset: () => {
    db.get("match")
      .assign({
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
