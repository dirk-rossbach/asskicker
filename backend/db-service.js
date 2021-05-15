const low = require("lowdb"),
  FileSync = require("lowdb/adapters/FileSync"),
  _ = require("lodash");

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
  matchArchive: [],
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
    db.get("players").push({ name: name, points: 0 }).write();
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
    matchArchive.insert(_.cloneDeep(m));
    givePoints(getWinnerTeam());
    match.reset();
  },
  addGoal: (team) => {
    db.get("match.teams").get(team).get("goals").push(Date.now()).write();
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

function getWinnerTeam() {
  const team0 = db.get("match.teams").get(0);
  const team1 = db.get("match.teams").get(1);
  const goalsCount0 = team0.get("goals").value().length;
  const goalsCount1 = team1.get("goals").value().length;
  if (goalsCount0 == goalsCount1) {
    // draw -> no points
    return undefined;
  } else if (goalsCount0 > goalsCount1) {
    return team0;
  } else {
    return team1;
  }
}

function givePoints(team) {
  if (team) {
    team
      .get("players")
      .value()
      .forEach((player) => {
        const p = db.get("players").find({ name: player });
        const pp = p.get("points").value();
        p.assign({ points: pp + 1 }).write();
      });
  }
}

const matchArchive = {
  getAll: () => {
    return db.get("matchArchive").value();
  },
  insert: (match) => {
    db.get("matchArchive").push(match).write();
  },
};

module.exports = { players, match, matchArchive };
