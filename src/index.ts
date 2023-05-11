import { timeUtil } from "./utils";

// days to use this week
const days = [1, 2, 3, 4, 5, 6];

const classes = [1, 2, 3, 4, 5];

const classDuration = {
  1: 60,
  2: 60,
  3: 60,
  4: 60,
  5: 120,
};

const classFreqPerWeek = {
  1: 2,
  2: 4,
  3: 3,
  4: 2,
  5: 1,
};

const slots = 24 * 15;

const dayTimes = {
  startTime: "09:00",
  endTime: "04:00",
};
