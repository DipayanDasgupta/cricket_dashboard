// app/data.ts
export const players = [
  { id: 1, name: 'Virat Kohli' },
  { id: 2, name: 'Babar Azam' },
  { id: 3, name: 'Steve Smith' },
  { id: 4, name: 'Kane Williamson' },
];

export const playerStats = {
  'Virat Kohli': {
    career: { matches: 292, runs: 13848, average: 58.67, strikeRate: 93.62 },
    performance: [
      { year: '2020', runs: 431 }, { year: '2021', runs: 204 }, { year: '2022', runs: 302 }, { year: '2023', runs: 1377 }, { year: '2024', runs: 542 },
    ],
  },
  'Babar Azam': {
    career: { matches: 117, runs: 5729, average: 56.72, strikeRate: 88.75 },
    performance: [
      { year: '2020', runs: 221 }, { year: '2021', runs: 405 }, { year: '2022', runs: 679 }, { year: '2023', runs: 1065 }, { year: '2024', runs: 384 },
    ],
  },
  'Steve Smith': {
    career: { matches: 161, runs: 5413, average: 44.73, strikeRate: 87.21 },
    performance: [
      { year: '2020', runs: 332 }, { year: '2021', runs: 120 }, { year: '2022', runs: 409 }, { year: '2023', runs: 589 }, { year: '2024', runs: 215 },
    ],
  },
  'Kane Williamson': {
    career: { matches: 165, runs: 6810, average: 48.64, strikeRate: 81.33 },
    performance: [
      { year: '2020', runs: 348 }, { year: '2021', runs: 128 }, { year: '2022', runs: 204 }, { year: '2023', runs: 820 }, { year: '2024', runs: 350 },
    ],
  },
};
