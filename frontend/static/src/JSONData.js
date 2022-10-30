const STATIC_GAMES = [
  {
    id: 11115,
    league: "standard",
    season: 2022,
    date: {
      start: "2022-10-27T23:30:00.000Z",
      end: null,
      duration: null,
    },
    stage: 2,
    status: {
      clock: "5:43",
      halftime: false,
      short: 2,
      long: "In Play",
    },
    periods: {
      current: 3,
      total: 4,
      endOfPeriod: false,
    },
    arena: {
      name: null,
      city: null,
      state: null,
      country: null,
    },
    teams: {
      visitors: {
        id: 8,
        name: "Dallas Mavericks",
        nickname: "Mavericks",
        code: "DAL",
        logo: "https://upload.wikimedia.org/wikipedia/fr/thumb/b/b8/Mavericks_de_Dallas_logo.svg/150px-Mavericks_de_Dallas_logo.svg.png",
      },
      home: {
        id: 4,
        name: "Brooklyn Nets",
        nickname: "Nets",
        code: "BKN",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Brooklyn_Nets_newlogo.svg/130px-Brooklyn_Nets_newlogo.svg.png",
      },
    },
    scores: {
      visitors: {
        win: 0,
        loss: 0,
        series: {
          win: 0,
          loss: 0,
        },
        linescore: ["30", "31", "12", ""],
        points: 73,
      },
      home: {
        win: 0,
        loss: 0,
        series: {
          win: 0,
          loss: 0,
        },
        linescore: ["23", "36", "16", ""],
        points: 75,
      },
    },
    officials: [],
    timesTied: null,
    leadChanges: null,
    nugget: null,
  },
  {
    id: 11116,
    league: "standard",
    season: 2022,
    date: {
      start: "2022-10-28T00:00:00.000Z",
      end: null,
      duration: null,
    },
    stage: 2,
    status: {
      clock: null,
      halftime: true,
      short: 2,
      long: "In Play",
    },
    periods: {
      current: 2,
      total: 4,
      endOfPeriod: false,
    },
    arena: {
      name: null,
      city: null,
      state: null,
      country: null,
    },
    teams: {
      visitors: {
        id: 16,
        name: "LA Clippers",
        nickname: "Clippers",
        code: "LAC",
        logo: "https://upload.wikimedia.org/wikipedia/fr/d/d6/Los_Angeles_Clippers_logo_2010.png",
      },
      home: {
        id: 25,
        name: "Oklahoma City Thunder",
        nickname: "Thunder",
        code: "OKC",
        logo: "https://upload.wikimedia.org/wikipedia/fr/thumb/4/4f/Thunder_d%27Oklahoma_City_logo.svg/1200px-Thunder_d%27Oklahoma_City_logo.svg.png",
      },
    },
    scores: {
      visitors: {
        win: 0,
        loss: 0,
        series: {
          win: 0,
          loss: 0,
        },
        linescore: ["24", "36", "", ""],
        points: 60,
      },
      home: {
        win: 0,
        loss: 0,
        series: {
          win: 0,
          loss: 0,
        },
        linescore: ["34", "19", "", ""],
        points: 53,
      },
    },
    officials: [],
    timesTied: null,
    leadChanges: null,
    nugget: null,
  },
];

export default STATIC_GAMES;
