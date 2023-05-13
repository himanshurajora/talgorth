import moment from "moment";
import * as _ from "lodash";
// days to use this week
const days = [1, 2, 3, 4, 5, 6];

// minutes in hour
const minutesInHour = 60;

const classes = [1];

// duration in minutes
const classDuration = {
  1: 60,
};

const minimumSlot = _.reduce(
  classDuration,
  (prev, curr) => {
    if (curr < prev) {
      return curr;
    }

    return prev;
  },
  Infinity
);

const classSlotSize = _.mapValues(
  classDuration,
  (duration) => duration / minimumSlot
);

const classFreqPerWeek = {
  1: 5,
} as any;

const classUsedFreq = _.mapValues(classFreqPerWeek, () => 0) as any;

const dayTimes = {
  startTime: "09:00",
  endTime: "15:00",
};

const startTimeMoment = moment(dayTimes.startTime, "HH:mm");
const endTimeMoment = moment(dayTimes.endTime, "HH:mm");

const totalHourPerDay = Math.abs(startTimeMoment.diff(endTimeMoment, "hours"));
const totalDays = days.length;
const totalSlots = totalHourPerDay / (minimumSlot / 60);
const classPerDay = _.mapValues(classFreqPerWeek, (freq) => freq / totalDays);

console.log({ totalHourPerDay });
console.log({ totalSlots });
console.log({ totalDays });
console.log({ classPerDay });
console.log({ classSlotSize });
console.log({ minimumSlot });

const timetable = [];

for (let day of days) {
  const dayTable = [];
  for (
    let start = startTimeMoment.clone(), end = endTimeMoment.clone();
    start.isBefore(end);
    start.add(60, "minutes")
  ) {
    let nearest = -1;
    for (let c in classFreqPerWeek) {
      console.log(
        "CALC",
        (classFreqPerWeek[c] - classUsedFreq[c]) / classFreqPerWeek[c]
      );
      if (classFreqPerWeek[c] - classUsedFreq[c] > 0) {
        nearest = +c;
      }
    }

    dayTable.push(nearest);

    if (nearest === -1) {
      dayTable.push();
    } else {
      classUsedFreq[nearest] += 1;
    }
  }
  timetable.push(dayTable);
}

console.log(timetable);
