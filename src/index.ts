import moment from "moment";
import * as _ from "lodash";
// days to use this week
const days = [1, 2, 3, 4, 5, 6];

const slotsPerDay = 8;

enum Subjects {
  MATH = "MATH",
  SCIENCE = "SCIENCE",
  ENGLISH = "ENGLISH",
  SST = "SST",
  EMPTY = "EMPTY",
}

const classData = [
  {
    name: Subjects.MATH,
    freq: 5,
    used: 0,
    size: 1,
  },
  {
    name: Subjects.SCIENCE,
    freq: 6,
    used: 0,
    size: 1,
  },
  {
    name: Subjects.ENGLISH,
    freq: 14,
    used: 0,
    size: 1,
  },
  {
    name: Subjects.SST,
    freq: 4,
    used: 0,
    size: 1,
  },
];

type ClassData = (typeof classData)[0];

const classSlotSize = {
  [Subjects.MATH]: 1,
  [Subjects.SCIENCE]: 1,
};

const tt: string[][] = [];
for (let i = 0; i < days.length; i++) {
  const td: string[] = [];
  for (let j = 0; j < slotsPerDay; j++) {
    const toPut = getMinimumDistanceClass(classData, i);
    if (toPut) {
      td.push(toPut.name);
      const index = _.findIndex(classData, (c) => c.name === toPut.name);
      classData[index].used += 1;
      continue;
    }

    td.push(Subjects.EMPTY);
  }
  tt.push(td);
}

console.table(tt);

function getMinimumDistanceClass(input: ClassData[], day: number) {
  const classWithProbabilities = _.map(input, (c) => {
    return {
      ...c,
      probability: (c.freq - c.used) / (days.length - day),
    };
  });

  const sorted = classWithProbabilities.sort(
    (a, b) => b.probability - a.probability
  );
  // const sorted = _.sortBy(classWithProbabilities, 'probability')
  const top = _.head(sorted);

  if (!top || top?.probability < 0.9) return null;

  return top;
}
